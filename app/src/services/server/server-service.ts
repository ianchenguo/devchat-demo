import {API_BASE_URL} from './api-url-const';
import * as rx from 'rx';

export class ServerService {

  static $inject = [
    '$http'
  ];

  constructor(private $http: angular.IHttpService) {}

  public get(path: string) {
    return rx.Observable.fromPromise(this.$http.get(`${API_BASE_URL}${path}`));
  }
}
