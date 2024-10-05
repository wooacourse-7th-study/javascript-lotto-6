import Controller from "./Controller/Controller.js";

class App {
  constructor() {
    this.controller = new Controller();
  }
  async play() {
    await this.controller.buyLotto();
    await this.controller.inputWinningNum();
    await this.controller.inputBonusNum();
    this.controller.result();
  }
}

export default App;
