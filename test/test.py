#!/usr/bin/env python3

import urllib3

TOKEN = ''

def public_api():
    http = urllib3.PoolManager()
    url = 'https://api.nature.global/1/devices/'
    result = http.request("GET", url, headers = {
        'Authorization': f'Bearer {TOKEN}',
        'accept': 'application/json',
    })
    print(result.data.decode())

if __name__ == '__main__':
    public_api()