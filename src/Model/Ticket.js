import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO } from "../constants/rules.js";
import { ERROR_MESSAGES } from "../constants/message.js";

/** 이용자가 구매한 티켓을 관리하는 Model입니다. */
class Ticket {
  #amount;
  #tickets = [];

  /**
   * 구매 금액을 받아 티켓 개수와, 각 티켓의 로또 번호를 필드에 저장합니다.
   * @param {string} money
   */
  constructor(money) {
    this.#validMoneyInput(money);
    this.#calculateAmount(money);
    for (let i = 0; i < this.#amount; i++) {
      this.#buyOneTicket();
    }
  }

  /** 입력받은 구매 금액의 유효성 검사 로직입니다. */
  #validMoneyInput(input) {
    if (isNaN(input)) throw new Error(ERROR_MESSAGES.ONLY_NUMBER);
    if (input % LOTTO.PURCHASE_UNIT !== 0)
      throw new Error(ERROR_MESSAGES.NOT_RIGHT_UNIT(LOTTO.PURCHASE_UNIT));
  }

  /** 구매 금액으로 티켓 개수를 구합니다. */
  #calculateAmount(money) {
    this.#amount = Math.floor(money / LOTTO.TICKET_PRICE);
  }

  /** 한개의 로또 티켓을 구매했을 때의 로또 번호를 구합니다. */
  #buyOneTicket() {
    const nums = MissionUtils.Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUM,
      LOTTO.MAX_NUM,
      LOTTO.NUM_COUNT
    );
    nums.sort((a, b) => a - b);
    this.#tickets.push(nums);
  }

  /**
   * 구매한 티켓 개수를 받아옵니다.
   * @returns {number}
   */
  getAmount() {
    return this.#amount;
  }

  /**
   * 구매한 티켓의 로또 번호가 담긴 배열을 받아옵니다.
   * @returns {number[][]}
   */
  getTickets() {
    return this.#tickets;
  }
}

export default Ticket;
