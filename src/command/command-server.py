#!/usr/bin/env python3

from flask import Flask, request, Response
from flask_cors import CORS
import subprocess
import traceback
import json

app = Flask(__name__)
CORS(app)

@app.route('/host/command', methods=['POST'])
def command():
    try:
        process = subprocess.run(json.loads(request.data)['command'].split(' ') ,stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if process.returncode == 0:
            app.logger.info(process.stdout.decode())
            return Response(response=str(process.stdout.decode()), status=200)
        else:
            app.logger.error(process.stderr.decode())
            return Response(response=str(process.stderr.decode()), status=500)
    except:
        log_message = traceback.format_exc()
        app.logger.error(log_message)
        return Response(response=str(log_message), status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)