import json
import os
import base64
import shutil
import datetime
from backend.settings import DATA_PATH

class DB:
    @staticmethod
    def getData() -> dict:
        try:
            with open(DATA_PATH, 'r') as f:
                return json.loads(base64.b64decode(f.read()).decode())
        except FileNotFoundError:
            return {
                'token': {
                    'yahoo': '',
                    'natureremo': ''
                },
                'climate': {
                    'latitude': '',
                    'longitude': ''
                }
            }
        except:
            raise

    @staticmethod
    def saveData(data):
        try:
            if os.path.exists(DATA_PATH):
                shutil.copy(DATA_PATH, f'{DATA_PATH}_{datetime.datetime.now().strftime("%Y%m%d-%H%M%S")}')
            with open(DATA_PATH, 'b+w') as f:
                return f.write(base64.b64encode(json.dumps(data).encode()))
        except:
            raise