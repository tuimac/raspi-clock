import axios from 'axios';
import { API_URL, NATURE_REMO_URL } from '../config/environment';

class NatureRemoServices {

  static getNatureRemoToken() {
    let url = API_URL + '/natureremo/token';
    return axios.get(url).then((result) =>
      {
        return result.data.result;
      })
      .catch((error) => {
        throw error;
      }
    );
  }

  static regitsterNatureRemoToken() {
    let url = API_URL + '/natureremo/token/';
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => 
    {
      return res.data.result;
    })
    .catch((error) => {
      throw error;
    });
  }


  static getNatureRemoDeviceInfo(token) {
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
