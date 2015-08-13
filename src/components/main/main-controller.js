export default class HomeController {
  constructor() {
    this.randomNumber = null;
  }

  generateNumber() {
    this.randomNumber = Math.ceil(Math.random() * 10);
  }
}
