import axios from 'axios';
import { API_URL } from '../config/environment';

class NatureRemoServices {

  static getFileList(path) {
    let url = API_URL + '/filelist/' + path;
    return axios.get(url).then((res) =>
      {
        return res.data.result;
      })
      .catch((error) => {
        throw error;
      }
    );
  }

  static getItemSize(path) {
    let url = API_URL + '/filelist/filesize/' + path;
    return axios.get(url).then((res) =>
      {
        return res.data.result;
      })
      .catch((error) => {
        throw error;
      }
    );
  }
}

export default NatureRemoServices;
