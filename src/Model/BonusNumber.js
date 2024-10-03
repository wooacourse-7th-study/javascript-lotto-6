class BonusNumber {
  #bonusNumber;

  constructor(number, winningNums) {
    this.#validateBonusNumber(number, winningNums);
    this.#bonusNumber = number;
  }

  #validateBonusNumber(number, winningNums) {
    if (isNaN(number)) throw new Error("[ERROR] 숫자만 입력 가능합니다.");
    if (winningNums.includes(number)) throw new Error("[ERROR] 중복된 숫자는 입력이 불가합니다.");
    if (number < 1 || number > 45) throw new Error("[ERROR] 로또 번호는 1 ~ 45사이여야 합니다.");
  }

  getBonusNumber() {
    return Number(this.#bonusNumber);
  }
}

export default BonusNumber;
