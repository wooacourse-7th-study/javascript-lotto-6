import { MissionUtils } from "@woowacourse/mission-utils";

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
    if (input % 1000 !== 0) throw new Error("[ERROR] 1,000원 단위로만 입력 가능합니다.");
  }

  #calculateAmount(money) {
    this.#amount = Math.floor(money / 1000);
  }

  #buyOneTicket() {
    const nums = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
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
