import { ERROR_MESSAGES } from "../constants/message.js";
import { LOTTO } from "../constants/rules.js";

class BonusNumber {
  #bonusNumber;

  constructor(number, winningNums) {
    this.#validateBonusNumber(number, winningNums);
    this.#bonusNumber = number;
  }

  #validateBonusNumber(number, winningNums) {
    if (isNaN(number)) throw new Error(ERROR_MESSAGES.ONLY_NUMBER);
    if (winningNums.includes(number)) throw new Error(ERROR_MESSAGES.DUPLICATE);
    if (number < LOTTO.MIN_NUM || number > LOTTO.MAX_NUM)
      throw new Error(ERROR_MESSAGES.NUM_RANGE(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
  }

  getBonusNumber() {
    return Number(this.#bonusNumber);
  }
}

export default BonusNumber;
