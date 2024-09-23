import Axios from 'axios';
import { restBaseUrl } from './constants';

export default class RestDataSource {
  static async sendRequest(callback = () => {}, url, method, data = {}) {
    const req = Axios.request({
      url,
      baseURL: restBaseUrl,
      method,
      data,
      withCredentials: false,
    });

    try {
      const res = await req;
      callback(res);
    } catch(err) {
      callback(err.response);
    }
  }
}