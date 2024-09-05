#!/usr/bin/env python3

import urllib3
import json

TOKEN = ''

def yahoo_api():
    http = urllib3.PoolManager()
    url = f'https://map.yahooapis.jp/weather/V1/place?coordinates=135.523781,34.675597&appid=&output=json'
    result = http.request('GET', url,)
    print(result.data.decode())

def public_api():
    http = urllib3.PoolManager()
    url = 'https://api.nature.global/1/devices/'
    result = http.request("GET", url, headers = {
        'Authorization': f'Bearer {TOKEN}',
        'accept': 'application/json',
    })
    print(json.dumps(json.loads(result.data.decode()), indent=4, separators=(',', ': ')))

if __name__ == '__main__':
    #public_api()
    yahoo_api()