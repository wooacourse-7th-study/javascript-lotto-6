import { ERROR_MESSAGE } from "./constants/errorMessage.js";
import { LOTTO_NUMBER } from "./constants/lottoRule.js";
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.some((num) => isNaN(num))) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
    }
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.NOT_ENOUGH_NUMBERS(LOTTO_NUMBER.LENGTH));
    }
    if (new Set(numbers).size !== LOTTO_NUMBER.LENGTH) {
      throw new Error(ERROR_MESSAGE.INPUT_DUPLICATION);
    }
    if (
      numbers.some((num) => num < LOTTO_NUMBER.MIN || num > LOTTO_NUMBER.MAX)
    ) {
      throw new Error(
        ERROR_MESSAGE.OUT_OF_RANGE(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX)
      );
    }
  }

  get numbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
