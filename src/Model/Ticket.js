import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO } from "../constants/rules.js";
import { ERROR_MESSAGES } from "../constants/message.js";

class Ticket {
  #amount;
  #tickets = [];

  constructor(money) {
    this.#validMoneyInput(money);
    this.#calculateAmount(money);
    for (let i = 0; i < this.#amount; i++) {
      this.#buyOneTicket();
    }
  }

  #validMoneyInput(input) {
    if (isNaN(input)) throw new Error(ERROR_MESSAGES.ONLY_NUMBER);
    if (input % LOTTO.PURCHASE_UNIT !== 0)
      throw new Error(ERROR_MESSAGES.NOT_RIGHT_UNIT(LOTTO.PURCHASE_UNIT));
  }

  #calculateAmount(money) {
    this.#amount = Math.floor(money / LOTTO.TICKET_PRICE);
  }

  #buyOneTicket() {
    const nums = MissionUtils.Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUM,
      LOTTO.MAX_NUM,
      LOTTO.NUM_COUNT
    );
    nums.sort((a, b) => a - b);
    this.#tickets.push(nums);
  }

  getAmount() {
    return this.#amount;
  }

  getTickets() {
    return this.#tickets;
  }
}

export default Ticket;
