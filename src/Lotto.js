import { MESSAGES, LOTTO_NUMBER, PRIZE_MONEY } from "./constants";
import { MissionUtils } from "@woowacourse/mission-utils";

class Lotto {
  #lottoNumbersStore = [];
  #lottoResult = {
    3: 0,
    4: 0,
    5: 0,
    "5B": 0,
    6: 0,
  };

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
    return numbers.some((number) => LOTTO_NUMBER.MIN < number || number > LOTTO_NUMBER.MAX);
  }

  #isDuplicateLottoNumberValidate(numbers) {
    return new Set(numbers).size !== LOTTO_NUMBER.LENGTH;
  }

  async #getUserInputLottoPrice() {
    const userInput = await MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_PRICE);
    const price = Number(userInput);

    if (this.#isLottoPriceValidate(price)) {
      throw new Error(MESSAGES.INVALID_LOTTO_PRICE);
    }

    return price;
  }

  async #getUserInputLottoNumber() {
    const userInput = await MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_NUMBER);
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

  async #getUserInputBonusNumber() {
    const userInput = await MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_NUMBER);
    const bonusNumber = Number(userInput);

    if (LOTTO_NUMBER.MIN < bonusNumber || bonusNumber > LOTTO_NUMBER.MAX) {
      throw new Error(MESSAGES.INVALID_LOTTO_NUMBER);
    }

    return bonusNumber;
  }

  #generateLottoNumbers() {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX, 6);
    return [...lottoNumbers].sort((a, b) => b - a);
  }

  #printLottoNumbers(price) {
    const count = price / LOTTO_NUMBER.DIVISION_PRICE;
    MissionUtils.Console.print(count + MESSAGES.BUY_LOTTO);

    for (let i = 0; i < count; i++) {
      const lottoNumbers = this.#generateLottoNumbers();
      MissionUtils.Console.print(lottoNumbers);
      this.#lottoNumbersStore.push(lottoNumbers);
    }
  }

  #getLottoResult(userInputLottoNumber, userInputBonusNumber) {
    let prizeMoney = 0;
    for (numbers of this.#lottoNumbersStore) {
      const currentNumbers = numbers;
      const matchCount = userInputLottoNumber.filter((number) => currentNumbers.includes(number)).length;

      if (matchCount === 5 && numbers.includes(userInputBonusNumber)) {
        result["5B"]++;
        prizeMoney += PRIZE_MONEY["5B"];
        continue;
      }

      if (this.#lottoResult[matchCount] === undefined) {
        continue;
      }

      this.#lottoResult[matchCount]++;
      prizeMoney += PRIZE_MONEY[matchCount];
    }

    return { result: this.#lottoResult, prizeMoney };
  }
}

export default Lotto;
