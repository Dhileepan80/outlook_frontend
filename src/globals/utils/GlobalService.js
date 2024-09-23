import RestDataSource from "./RestDataSource";

export default class GlobalService {
  static generalSelect(callback = () => {}, url, method, data = {}) {
    RestDataSource.sendRequest((res) => {
      callback(res.data);
    }, url, method, data);
  }
}