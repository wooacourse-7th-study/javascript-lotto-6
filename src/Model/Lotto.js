import { ERROR_MESSAGES } from "../constants/message.js";
import { LOTTO } from "../constants/rules.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    for (let number of numbers) {
      this.#validateEachNum(number);
    }
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.NUM_COUNT)
      throw new Error(ERROR_MESSAGES.LOTTO_COUNT(LOTTO.NUM_COUNT));

    const setNums = new Set(numbers);
    if (setNums.size !== numbers.length) throw new Error(ERROR_MESSAGES.DUPLICATE);
  }

  // TODO: 추가 기능 구현
  #validateEachNum(number) {
    if (isNaN(number)) throw new Error(ERROR_MESSAGES.ONLY_NUMBER);
    if (number.trim() === "") throw new Error(ERROR_MESSAGES.BLANK);
    if (number < LOTTO.MIN_NUM || number > LOTTO.MAX_NUM)
      throw new Error(ERROR_MESSAGES.NUM_RANGE(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
  }

  getWinningNumbers() {
    return this.#numbers.map((val) => Number(val));
  }
}

export default Lotto;
