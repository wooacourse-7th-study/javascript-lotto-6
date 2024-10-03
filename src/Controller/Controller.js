import { MissionUtils } from "@woowacourse/mission-utils";
import Ticket from "../Model/Ticket.js";
import Input from "../View/Input.js";
import Output from "../View/Output.js";
import Lotto from "../Model/Lotto.js";
import BonusNumber from "../Model/BonusNumber.js";
import WinTicket from "../Model/WinTicket.js";

class Controller {
  #purchaseMoney;

  constructor() {
    this.input = new Input();
    this.output = new Output();
  }

  async buyLotto() {
    try {
      this.#purchaseMoney = await this.input.inputMoney();
      this.ticket = new Ticket(this.#purchaseMoney);
      this.output.outputTicketAmount(this.ticket.getAmount());
      this.output.outputTickets(this.ticket.getTickets());
    } catch (error) {
      MissionUtils.Console.print(error.message);
      await this.buyLotto();
    }
  }

  async inputWinningNum() {
    try {
      const winningNums = await this.input.inputWinningNums();
      this.lotto = new Lotto(winningNums);
      const bonusNum = await this.input.inputBonusNum();
      this.bonusNumber = new BonusNumber(bonusNum, this.lotto.getWinningNumbers());
    } catch (error) {
      MissionUtils.Console.print(error.message);
      await this.inputWinningNum();
    }
  }

  result() {
    const tickets = this.ticket.getTickets();
    const winningNums = this.lotto.getWinningNumbers();
    const bonusNum = this.bonusNumber.getBonusNumber();
    const winTicket = new WinTicket(tickets, winningNums, bonusNum, this.#purchaseMoney);
    this.output.printResult(winTicket.getUserRank(), winTicket.getProfitRate());
  }
}

export default Controller;
