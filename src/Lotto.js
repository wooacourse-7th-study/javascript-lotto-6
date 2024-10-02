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

  #isLottoNumberValidate(number) {
    return LOTTO_NUMBER.MIN > number || number > LOTTO_NUMBER.MAX;
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

    return price;
  }

  async getUserInputLottoNumber() {
    const userInput = await MissionUtils.Console.readLineAsync(MESSAGES.INPUT_LOTTO_NUMBER);
    const userLottoNumbers = userInput.split(",").map((number) => Number(number));

    if (this.#isLottoNumberLengthValidate(userLottoNumbers)) {
      throw new Error(MESSAGES.SIX_LENGTH_LOTTO_NUMBER);
    }

    if (userLottoNumbers.some((number) => this.#isLottoNumberValidate(number))) {
      throw new Error(MESSAGES.INVALID_LOTTO_NUMBER);
    }

    if (this.#isDuplicateLottoNumberValidate(userLottoNumbers)) {
      throw new Error(MESSAGES.DUPLICATE_LOTTO_NUMBER);
    }

    return userLottoNumbers;
  }

  async getUserInputBonusNumber() {
    const userInput = await MissionUtils.Console.readLineAsync(MESSAGES.INPUT_BONUS_NUMBER);
    const bonusNumber = Number(userInput);

    if (this.#isLottoNumberValidate(bonusNumber)) {
      throw new Error(MESSAGES.INVALID_LOTTO_NUMBER);
    }

    return bonusNumber;
  }

  #generateLottoNumbers() {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX, 6);
    return [...lottoNumbers].sort((a, b) => a - b);
  }

  getLottoNumbers(price) {
    const count = price / LOTTO_NUMBER.DIVISION_PRICE;
    MissionUtils.Console.print("\n" + count + MESSAGES.BUY_LOTTO);

    for (let i = 0; i < count; i++) {
      const lottoNumbers = this.#generateLottoNumbers();
      this.#lottoNumbersStore.push(lottoNumbers);
    }

    return this.#lottoNumbersStore;
  }

  printLottoNumbers(lottoNumbersStore) {
    lottoNumbersStore.forEach((numbers) => {
      MissionUtils.Console.print(`[${numbers.join(", ")}]`);
    });
  }

  getLottoResult(userLottoNumbers, userBonusNumber, lottoNumbersStore) {
    for (const currentNumbers of lottoNumbersStore) {
      const matchCount = userLottoNumbers.filter((number) => currentNumbers.includes(number)).length;

      if (matchCount === 5 && numbers.includes(userBonusNumber)) {
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

    return { result: this.#lottoResult, prizeMoney: this.#prizeMoney };
  }

  #getRevenueRate(price, prizeMoney) {
    return (((prizeMoney - price) / price) * 100).toFixed(1).toLocaleString();
  }

  printResult(result, price, prizeMoney) {
    MissionUtils.Console.print(MESSAGES.RESULT_LOTTO);

    for (const [key, count] of Object.entries(result)) {
      if (key === "5B") {
        MissionUtils.Console.print(`5개 일치, 보너스 일치 (${PRIZE_MONEY[key]}원)- ${count}개`);
        continue;
      }

      MissionUtils.Console.print(`${key}개 일치 (${PRIZE_MONEY[key]}원)- ${count}개`);
    }

    const revenueRate = this.#getRevenueRate(price, prizeMoney);
    MissionUtils.Console.print(MESSAGES.REVENUE_RATE(revenueRate));
  }
}

export default Lotto;
