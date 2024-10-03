import { ERROR_MESSAGES } from "../constants/message.js";
import { LOTTO } from "../constants/rules.js";

/** 로또 당첨 번호를 관리하는 Model입니다. */
class Lotto {
  #numbers;

  /**
   * 로또 당첨 번호를 받아 유효성 검사를 거쳐 필드에 저장합니다.
   * @param {string[]} numbers
   */
  constructor(numbers) {
    this.#validate(numbers);
    for (let number of numbers) {
      this.#validateEachNum(number);
    }
    this.#numbers = numbers;
  }

  /** 당첨 번호 배열의 유효성 검사 로직입니다. */
  #validate(numbers) {
    if (numbers.length !== LOTTO.NUM_COUNT)
      throw new Error(ERROR_MESSAGES.LOTTO_COUNT(LOTTO.NUM_COUNT));

    const setNums = new Set(numbers);
    if (setNums.size !== numbers.length) throw new Error(ERROR_MESSAGES.DUPLICATE);
  }

  /** 각 당첨 번호의 유효성 검사 로직입니다. */
  #validateEachNum(number) {
    if (isNaN(number)) throw new Error(ERROR_MESSAGES.ONLY_NUMBER);
    if (number.trim() === "") throw new Error(ERROR_MESSAGES.BLANK);
    if (number < LOTTO.MIN_NUM || number > LOTTO.MAX_NUM)
      throw new Error(ERROR_MESSAGES.NUM_RANGE(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
  }

  /**
   * 로또 당첨 번호를 받아옵니다.
   * @returns {number[]}
   */
  getWinningNumbers() {
    return this.#numbers.map((val) => Number(val));
  }
}

export default Lotto;
