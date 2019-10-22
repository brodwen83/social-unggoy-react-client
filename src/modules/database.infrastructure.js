import Axios from 'axios';
import config from '../config/config';

class APIClient {
  axiosInstance;

  init = token => {
    console.log('axios initialized');
    this.axiosInstance = Axios.create({
      baseURL: config.apiURL,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  };

  read = route => {
    console.log('config.apiURL', config.apiURL);
    console.log('this.axiosInstance', this.axiosInstance);
    return this.axiosInstance.get(route).then(res => res.data);
  };
}

export default new APIClient();
