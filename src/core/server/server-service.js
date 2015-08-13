export default class server {
  constructor($http) {
    this.$http = $http;
  }

  get(id) {
    return $http.get(id);
  }
}

server.$inject = ['$http'];
