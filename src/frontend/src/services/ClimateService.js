import axios from 'axios';
import { API_URL } from '../config/environment';

const ClimateService = {
  getClimate: function() {
    let url = `${API_URL}/climate/`;
    return axios.get(url).then((result) =>
      {
        return JSON.parse(result.data.result);
      })
      .catch((error) => {
        throw error;
      }
    );
  }
}

export default ClimateService;
