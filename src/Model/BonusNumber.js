import { ERROR_MESSAGES } from "../constants/message.js";
import { LOTTO } from "../constants/rules.js";

/** 로또 보너스 번호를 관리하는 Model입니다. */
class BonusNumber {
  #bonusNumber;

  /**
   * 로또 보너스 번호를 받아 유효성 검사를 거쳐 필드에 저장합니다.
   * @param {string} number - 입력받은 로또 보너스 번호
   * @param {number[]} winningNums - 이전에 입력받았던 로또 당첨 번호
   */
  constructor(number, winningNums) {
    this.#validateBonusNumber(number, winningNums);
    this.#bonusNumber = number;
  }

  /** 보너스 번호의 유효성 검사 로직입니다. */
  #validateBonusNumber(number, winningNums) {
    if (isNaN(number)) throw new Error(ERROR_MESSAGES.ONLY_NUMBER);
    if (winningNums.includes(number)) throw new Error(ERROR_MESSAGES.DUPLICATE);
    if (number < LOTTO.MIN_NUM || number > LOTTO.MAX_NUM)
      throw new Error(ERROR_MESSAGES.NUM_RANGE(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
  }

  /**
   * 로또 보너스 번호를 받아옵니다.
   * @returns {number}
   */
  getBonusNumber() {
    return Number(this.#bonusNumber);
  }
}

export default BonusNumber;
