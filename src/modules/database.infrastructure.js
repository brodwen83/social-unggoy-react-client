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

  read = route => this.axiosInstance.get(route).then(res => res.data);
  update = (route, newData) =>
    this.axiosInstance.post(route, newData).then(res => res.data);

  imageUpload = formData =>
    this.axiosInstance.post('/user/image', formData).then(res => res.data);
}

export default new APIClient();
