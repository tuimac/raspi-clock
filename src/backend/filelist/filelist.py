import logging
import os
import pwd
import re
from backend.settings import CONFIG

logger = logging.getLogger("django")

class Filelist:

    @staticmethod
    def listitems(path) -> dict:
        item_data = { 'row': [], 'column': [], 'root_path': CONFIG['root_directory'] }
        path = os.path.join(CONFIG['root_directory'], path)
        with os.scandir(path) as item_list:
            for item in item_list:
                item_info = {}
                item_info['name'] = item.name
                item_info['type'] = 'file' if item.is_file() else 'directory'
                item_info['owner'] = pwd.getpwuid(item.stat().st_uid).pw_name
                item_info['mtime'] = item.stat().st_mtime
                item_info['size'] = '-'
                item_data['row'].append(item_info)
                item_data['column'] = list(item_info.keys())
        return item_data

    @staticmethod
    def listitemsize(path) -> dict:
        def _get_dir_size(path) -> int:
            total_size = 0
            with os.scandir(path) as item_list:
                for item in item_list:
                    if item.is_file():
                        total_size += item.stat().st_size
                    elif item.is_dir():
                        total_size += _get_dir_size(item.path)
            return total_size
        size_info = {}
        path = re.sub('^/', '', path)
        path = os.path.join(CONFIG['root_directory'], path)
        with os.scandir(path) as item_list:
            for item in item_list:
                if item.is_file():
                    size_info[item.name] = item.stat().st_size
                elif item.is_dir():
                    size_info[item.name] = _get_dir_size(item.path)
        return size_info