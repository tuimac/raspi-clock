#!/usr/bin/env python3

from flask import Flask
import os

app = Flask(__name__)

@app.route('/shutdown', methods=['POST'])
def shutdown():
    os.system('sudo shutdown -h now')
    return 'shutdown is successed.'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
