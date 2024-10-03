import { MissionUtils } from "@woowacourse/mission-utils";
import Ticket from "../Model/Ticket.js";
import Input from "../View/Input.js";
import Output from "../View/Output.js";
import Lotto from "../Model/Lotto.js";
import BonusNumber from "../Model/BonusNumber.js";
import { RANK } from "../constants/rules.js";

class Controller {
  #purchaseMoney;
  #userRank = Array.from({ length: 6 }, () => 0);

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
    for (let ticket of tickets) {
      const rank = this.#calculateMatch(ticket, winningNums, bonusNum);
      if (rank) this.#userRank[rank]++;
    }
    const profitRate = this.#calculateProfit(this.#purchaseMoney, this.#userRank);
    this.output.printResult(this.#userRank, profitRate);
  }

  #calculateMatch(ticket, winningNums, bonusNum) {
    const matchNums = ticket.filter((num) => winningNums.includes(num));
    if (matchNums.length < 3) return;
    else if (matchNums.length === 6) return 1;
    else if (matchNums.length === 5 && ticket.includes(bonusNum)) return 2;
    else return 8 - matchNums.length;
  }

  #calculateProfit(purchase, userRank) {
    let winMoney = 0;
    for (let i = 1; i < userRank.length; i++) {
      winMoney += userRank[i] * RANK[i].PRICE;
    }
    return Math.round((winMoney / purchase) * 1000) / 10;
  }
}

export default Controller;
