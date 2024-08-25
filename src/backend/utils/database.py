import json
import base64
from backend.settings import DATA_PATH

class DB:
    @staticmethod
    def getData() -> dict:
        try:
            with open(DATA_PATH, 'r') as f:
                return json.loads(base64.b64decode(f.read()).decode())
        except FileNotFoundError:
            return {
                'natureremo': {
                    'token': ''
                }
            }
        except:
            raise

    @staticmethod
    def saveData(data):
        try:
            with open(DATA_PATH, 'b+w') as f:
                return f.write(base64.b64encode(json.dumps(data).encode()))
        except:
            raise