import { ERROR_MESSAGES } from "../constants/message.js";
import { LOTTO_RULES } from "../constants/rules.js";

/** 로또 당첨 번호를 관리하는 Model입니다. */
class Lotto {
  #numbers;

  /**
   * 로또 당첨 번호를 받아 유효성 검사를 거쳐 필드에 저장합니다.
   * @param {string[]} numbers
   */
  constructor(numbers) {
    this.#validate(numbers);
    for (const number of numbers) {
      this.#validateEachNum(number);
    }
    this.#numbers = numbers;
  }

  /** 당첨 번호 배열의 유효성 검사 로직입니다. */
  #validate(numbers) {
    if (numbers.length !== LOTTO_RULES.NUM_COUNT)
      throw new Error(ERROR_MESSAGES.LOTTO_COUNT(LOTTO_RULES.NUM_COUNT));

    const setNums = new Set(numbers);
    if (setNums.size !== numbers.length) throw new Error(ERROR_MESSAGES.DUPLICATE);
  }

  /** 각 당첨 번호의 유효성 검사 로직입니다. */
  #validateEachNum(number) {
    if (isNaN(number)) throw new Error(ERROR_MESSAGES.ONLY_NUMBER);
    if (number.trim() === "") throw new Error(ERROR_MESSAGES.BLANK);
    if (number < LOTTO_RULES.MIN_NUM || number > LOTTO_RULES.MAX_NUM)
      throw new Error(ERROR_MESSAGES.NUM_RANGE(LOTTO_RULES.MIN_NUM, LOTTO_RULES.MAX_NUM));
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
