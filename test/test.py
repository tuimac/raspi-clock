#!/usr/bin/env python3

import urllib3
import json

TOKEN = 'FjmXv48rMX3XRxrFUJogVHp6Inrq90Bte1Oqn3vJO-k.eptdkLjph9LVlQAA_L22uVDEoSBy41gYya6JSgf_nxI'

def public_api():
    http = urllib3.PoolManager()
    url = 'https://api.nature.global/1/devices/'
    result = http.request("GET", url, headers = {
        'Authorization': f'Bearer {TOKEN}',
        'accept': 'application/json',
    })
    print(json.dumps(json.loads(result.data.decode()), indent=4, separators=(',', ': ')))

if __name__ == '__main__':
    public_api()