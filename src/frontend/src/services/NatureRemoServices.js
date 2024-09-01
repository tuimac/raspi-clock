import axios from 'axios';
import { API_URL, NATURE_REMO_URL } from '../config/environment';

const NatureRemoServices = {
  getNatureRemoToken: function() {
    let url = `${API_URL}/tokens/natureremo/`;
    return axios.get(url).then((result) =>
      {
        return result.data.result;
      })
      .catch((error) => {
        throw error;
      }
    );
  },
  regitsterNatureRemoToken: function() {
    let url = `${API_URL}/tokens/natureremo/`;
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
  },
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
