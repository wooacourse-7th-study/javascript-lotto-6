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

  #getUserInputLottoPrice() {
    const userInput = MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_PRICE);

    if (this.#isLottoPriceValidate(userInput)) {
      throw new Error(MESSAGES.INVALID_LOTTO_PRICE);
    }

    return userInput;
  }
}

export default Lotto;
