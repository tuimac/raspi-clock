from backend.settings import BRIGHTNESS_PATH
from backend.settings import BRIGHTNESS_MAX_PATH

class Brightness:
    @staticmethod
    def getBrightness() -> dict:
        try:
            brightness_info = {}
            with open(BRIGHTNESS_PATH, 'r') as f:
                brightness_info['brightness'] = f.read().replace('\n', '')
            with open(BRIGHTNESS_MAX_PATH, 'r') as f:
                brightness_info['max_brightness'] = f.read().replace('\n', '')
            return brightness_info
        except:
            raise

    @staticmethod
    def updateBrightness(brightness_value):
        try:
            with open(BRIGHTNESS_PATH, mode='w') as f:
                f.write(str(brightness_value))
        except:
            raise