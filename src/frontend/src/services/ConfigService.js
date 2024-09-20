import axios from 'axios';
import { API_URL } from '../config/environment';

const ConfigService = {
  getConfig: function() {
    let url = `${API_URL}/config/`;
    return axios.get(url).then((result) =>
      {
        return JSON.parse(result.data.result);
      })
      .catch((error) => {
        throw error;
      }
    );
  },
  saveConfig: function(config) {
    let url = `${API_URL}/config/`;
    return axios.post(url, JSON.stringify(config), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) =>
    {
      return res.data.result;
    })
    .catch((error) => {
      throw error;
    });
  },
  getBrightness: function() {
    let url = `${API_URL}/config/brightness/`;
    return axios.get(url).then((result) =>
      {
        return JSON.parse(result.data.result);
      })
      .catch((error) => {
        throw error;
      }
    );
  },
  updateBrightness: function(config) {
    let url = `${API_URL}/config/brightness/`;
    return axios.post(url, JSON.stringify(config), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) =>
    {
      return res.data.result;
    })
    .catch((error) => {
      throw error;
    });
  },
  sendCommand: function(command) {
    let url = `${API_URL}/api/command`;
    let data = { command: command };
    return axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) =>
    {
      return res.data.result;
    })
    .catch((error) => {
      throw error;
    });
  },
}

export default ConfigService;
