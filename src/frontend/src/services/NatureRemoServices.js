import axios from 'axios';
import { NATURE_REMO_URL } from '../config/environment';

const NatureRemoServices = {
  getNatureRemoDeviceInfo: function(token) {
    return axios.get(NATURE_REMO_URL, {
      maxRedirects: 5,
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    }).then((result) =>
    {
      for(let i = 0; i < result.data.length; i++) {
        if(result.data[i]['name'] === 'Kento room') {
          return result.data[i]['newest_events'];
        }
      }
    })
    .catch((error) => {
      throw error;
    });
  }
}

export default NatureRemoServices;
