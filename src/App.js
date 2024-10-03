import Controller from "./Controller/Controller.js";

class App {
  constructor() {
    this.controller = new Controller();
  }
  async play() {
    await this.controller.buyLotto();
  }
}

export default App;
