import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO } from "../constants/rules.js";

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
    if (isNaN(input)) throw new Error("[ERROR] 숫자만 입력할 수 있습니다.");
    if (input % LOTTO.PURCHASE_UNIT !== 0)
      throw new Error(`[ERROR] ${LOTTO.PURCHASE_UNIT}원 단위로만 입력 가능합니다.`);
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
