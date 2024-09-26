import { MESSAGES, LOTTO_NUMBER } from "./constants";
import { MissionUtils } from "@woowacourse/mission-utils";

class Lotto {
  // 로또 구매 금액 유효성 검사
  #isLottoPriceValidate(price) {
    if (price % LOTTO_NUMBER.DIVISION_PRICE === 0) {
      return false;
    }

    return true;
  }

  #isLottoNumberLengthValidate(numbers) {
    if (numbers.length === LOTTO_NUMBER.LENGTH) {
      return false;
    }

    return true;
  }

  #isLottoNumberValidate(numbers) {
    return [...numbers].some((number) => LOTTO_NUMBER.MIN < number || number > LOTTO_NUMBER.MAX);
  }

  #isDuplicateLottoNumberValidate(numbers) {
    return new Set(numbers).size !== LOTTO_NUMBER.LENGTH;
  }

  #getUserInputLottoPrice() {
    const userInput = MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_PRICE);

    if (this.#isLottoPriceValidate(userInput)) {
      throw new Error(MESSAGES.INVALID_LOTTO_PRICE);
    }

    return userInput;
  }

  #getUserInputLottoNumber() {
    const userInput = MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_NUMBER);
    const lottoNumbers = userInput.split(",").map((number) => Number(number));

    if (this.#isLottoNumberLengthValidate(lottoNumbers)) {
      throw new Error(MESSAGES.SIX_LENGTH_LOTTO_NUMBER);
    }

    if (this.#isLottoNumberValidate(lottoNumbers)) {
      throw new Error(MESSAGES.INVALID_LOTTO_NUMBER);
    }

    if (this.#isDuplicateLottoNumberValidate(lottoNumbers)) {
      throw new Error(MESSAGES.DUPLICATE_LOTTO_NUMBER);
    }

    return lottoNumbers;
  }
}

export default Lotto;
