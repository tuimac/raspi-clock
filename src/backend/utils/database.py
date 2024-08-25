import json
import base64
from backend.settings import DATA_PATH

class DB:
    @staticmethod
    def getData() -> dict:
        try:
            with open(DATA_PATH, 'r') as f:
                return json.loads(base64.decode(f.read))
        except FileNotFoundError:
            return {}
        except:
            raise

    @staticmethod
    def saveData(data):
        try:
            with open(DATA_PATH, 'w') as f:
                return f.write(base64.encode(json.dumps(data)))
        except:
            raise