import axios from 'axios';
import { API_URL, CLIMATE_URL } from '../config/environment';

const ClimateService = {
  getClimateToken: function() {
    let url = `${API_URL}/tokens/yahoo/`;
    return axios.get(url).then((result) =>
      {
        return result.data.result;
      })
      .catch((error) => {
        throw error;
      }
    );
  },
  regitsterClimateToken: function() {
    let url = `${API_URL}/tokens/yahoo/`;
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
  getClimateConfig: function() {
    let url = `${API_URL}/climate/config/`;
    return axios.get(url).then((result) =>
      {
        return result.data.result;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      }
    );
  }
}

export default ClimateService;
