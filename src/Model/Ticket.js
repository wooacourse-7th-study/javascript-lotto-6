class Ticket {
  constructor(money) {
    this.#validMoneyInput(money);
  }

  #validMoneyInput(input) {
    if (isNaN(input)) throw new Error("[ERROR] 숫자만 입력할 수 있습니다.");
    if (input % 1000 !== 0) throw new Error("[ERROR] 1,000원 단위로만 입력 가능합니다.");
  }
}

export default Ticket;
