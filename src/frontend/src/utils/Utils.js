class Utils {

  static sanitize_url(file_path) {
    var index = 0;
    while(index < file_path.length){
      if(file_path[index] === ''){
        file_path.splice(index, 1);
      } else {
        ++index;
      }
    }
    return file_path;
  }

  static join_path(base_path, additional_path) {
    return base_path === '' ? additional_path : base_path.replace('/$', '') + '/' + additional_path;
  }

  static size_unit(size) {
    if(size < 1024) {
      return size + ' B';
    } else if ( size >= 1024 && size < (1024 * 1024)) {
      return (Math.floor((size / 1024) * Math.pow(10, 1) ) / Math.pow(10, 1)).toString() + ' KB';
    } else if ( size >= (1024 * 1024) && size < (1024 * 1024 * 1024)) {
      return (Math.floor((size / 1024 / 1024) * Math.pow(10, 1) ) / Math.pow(10, 1)).toString() + ' MB';
    } else if ( size >= (1024 * 1024 * 1024)) {
      return (Math.floor((size / 1024 / 1024 / 1024) * Math.pow(10, 1) ) / Math.pow(10, 1)).toString() + ' GB';
    } else {
      return 'N/A'
    }
  }

  static convert_to_datetime(unix_time) {
    var date = new Date(unix_time * 1000);
    return date.getFullYear() + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
  }

}

export default Utils;
