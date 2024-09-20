#!/usr/bin/env python3

from flask import Flask, request
import os
import traceback
import json

app = Flask(__name__)

@app.route('/shutdown', methods=['POST'])
def shutdown():
    try:
        result = os.system(json.loads(request.data)['commands'])
        return result
    except:
        return traceback.format_exc()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)