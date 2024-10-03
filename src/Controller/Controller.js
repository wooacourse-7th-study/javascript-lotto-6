import { MissionUtils } from "@woowacourse/mission-utils";
import Ticket from "../Model/Ticket.js";
import Input from "../View/Input.js";
import Output from "../View/Output.js";
import Lotto from "../Model/Lotto.js";
import BonusNumber from "../Model/BonusNumber.js";
import WinTicket from "../Model/WinTicket.js";

/** 로또 게임의 Controller입니다. */
class Controller {
  #purchaseMoney;

  constructor() {
    this.input = new Input();
    this.output = new Output();
  }

  /** 로또 구입 금액을 입력하고 로또 개수와 각 로또의 번호를 출력합니다. */
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

  /** 당첨 번호와 보너스 번호를 입력받습니다. */
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

  /** 당첨 결과와 수익률을 계산하고 출력합니다. */
  result() {
    const tickets = this.ticket.getTickets();
    const winningNums = this.lotto.getWinningNumbers();
    const bonusNum = this.bonusNumber.getBonusNumber();
    const winTicket = new WinTicket(tickets, winningNums, bonusNum, this.#purchaseMoney);
    this.output.printResult(winTicket.getUserRank(), winTicket.getProfitRate());
  }
}

export default Controller;
