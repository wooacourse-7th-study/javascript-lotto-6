import { MissionUtils } from "@woowacourse/mission-utils";
import Ticket from "../Model/Ticket.js";
import Input from "../View/Input.js";
import Output from "../View/Output.js";

class Controller {
  constructor() {
    this.input = new Input();
    this.output = new Output();
  }

  async buyLotto() {
    try {
      const purchaseMoney = await this.input.inputMoney();
      this.ticket = new Ticket(purchaseMoney);
      this.output.outputTicketAmount(this.ticket.getAmount());
      this.output.outputTickets(this.ticket.getTickets());
    } catch (error) {
      MissionUtils.Console.print(error.message);
      await this.buyLotto();
    }
  }
}

export default Controller;
