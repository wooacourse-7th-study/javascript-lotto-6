import { MESSAGES, LOTTO_NUMBER, PRIZE_MONEY } from "./constants/index.js";
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
  #prizeMoney = 0;
  #price = 0;
  #userLottoNumbers;
  #userBonusNumber;

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

  async getUserInputLottoPrice() {
    const userInput = await MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_PRICE);
    const price = Number(userInput);

    if (this.#isLottoPriceValidate(price)) {
      throw new Error(MESSAGES.INVALID_LOTTO_PRICE);
    }

    this.#price = price;
  }

  async getUserInputLottoNumber() {
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

    this.#userLottoNumbers = lottoNumbers;
  }

  async getUserInputBonusNumber() {
    const userInput = await MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_NUMBER);
    const bonusNumber = Number(userInput);

    if (LOTTO_NUMBER.MIN < bonusNumber || bonusNumber > LOTTO_NUMBER.MAX) {
      throw new Error(MESSAGES.INVALID_LOTTO_NUMBER);
    }

    this.#userBonusNumber = bonusNumber;
  }

  #generateLottoNumbers() {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX, 6);
    return [...lottoNumbers].sort((a, b) => b - a);
  }

  printLottoNumbers(price) {
    const count = price / LOTTO_NUMBER.DIVISION_PRICE;
    MissionUtils.Console.print(count + MESSAGES.BUY_LOTTO);

    for (let i = 0; i < count; i++) {
      const lottoNumbers = this.#generateLottoNumbers();
      MissionUtils.Console.print(lottoNumbers);
      this.#lottoNumbersStore.push(lottoNumbers);
    }
  }

  calculateLottoResult() {
    for (numbers of this.#lottoNumbersStore) {
      const currentNumbers = numbers;
      const matchCount = this.#userLottoNumbers.filter((number) => currentNumbers.includes(number)).length;

      if (matchCount === 5 && numbers.includes(this.#userBonusNumber)) {
        result["5B"]++;
        this.#prizeMoney += PRIZE_MONEY["5B"];
        continue;
      }

      if (this.#lottoResult[matchCount] === undefined) {
        continue;
      }

      this.#lottoResult[matchCount]++;
      this.#prizeMoney += PRIZE_MONEY[matchCount];
    }
  }

  #getRevenueRate() {
    return (((this.#prizeMoney - this.#price) / this.#price) * 100).toFixed(1).toLocaleString();
  }

  printResult(result) {
    MissionUtils.Console.print(MESSAGES.RESULT_LOTTO);

    for (const [key, count] of Object.entries(result)) {
      if (key === "5B") {
        MissionUtils.Console.print(`5개 일치, 보너스 일치 (${PRIZE_MONEY[key]}원)- ${count}개`);
        continue;
      }

      MissionUtils.Console.print(`${key}개 일치 (${PRIZE_MONEY[key]}원)- ${count}개`);
    }

    const revenueRate = this.#getRevenueRate();
    MissionUtils.Console.print(MESSAGES.REVENUE_RATE(revenueRate));
  }
}

export default Lotto;
