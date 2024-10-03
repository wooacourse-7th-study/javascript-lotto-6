import { MissionUtils } from "@woowacourse/mission-utils";
import Ticket from "../Model/Ticket.js";
import Input from "../View/Input.js";

class Controller {
  constructor() {
    this.input = new Input();
  }

  async buyLotto() {
    try {
      const purchaseMoney = await this.input.inputMoney();
      this.ticket = new Ticket(purchaseMoney);
    } catch (error) {
      MissionUtils.Console.print(error.message);
      await this.buyLotto();
    }
  }
}

export default Controller;
