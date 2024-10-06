import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import { LOTTO_NUMBER } from "./constants/lottoRule.js";
import { ERROR_MESSAGE } from "./constants/errorMessage.js";
import { LOTTO_PRIZE } from "./constants/lottoRule.js";

class LottoManager {
  buyLottos(amount) {
    const count = amount / LOTTO_NUMBER.LOTTO_PRICE;
    return Array.from({ length: count }, () => this.generateLotto());
  }

  generateLotto() {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO_NUMBER.MIN,
      LOTTO_NUMBER.MAX,
      LOTTO_NUMBER.LENGTH
    );
    return new Lotto(numbers.sort((a, b) => a - b));
  }

  validatePurchaseAmount(amount) {
    if (amount % LOTTO_NUMBER.LOTTO_PRICE !== 0) {
      throw new Error(
        ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT(LOTTO_NUMBER.LOTTO_PRICE)
      );
    }
  }

  parseWinningNumbers(input) {
    const numbers = input.split(",").map((num) => parseInt(num.trim()));
    if (numbers.length !== LOTTO_NUMBER.LENGTH) {
      throw new Error(
        ERROR_MESSAGE.INVALID_WINNING_NUMBERS(LOTTO_NUMBER.LENGTH)
      );
    }
    return new Lotto(numbers).numbers;
  }

  parseBonusNumber(input, winningNumbers) {
    const number = parseInt(input);
    if (number < LOTTO_NUMBER.MIN || number > LOTTO_NUMBER.MAX) {
      throw new Error(
        ERROR_MESSAGE.INVALID_BONUS_NUMBER(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX)
      );
    }
    if (winningNumbers.includes(number)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
    }
    return number;
  }
  // 5.5는 5개 일치 + 보너스 번호 일치한 것
  checkWinningResult(lottos, winningNumbers, bonusNumber) {
    const result = { 3: 0, 4: 0, 5: 0, 5.5: 0, 6: 0 };
    lottos.forEach((lotto) => {
      const matchCount = this.countMatches(lotto.numbers, winningNumbers);
      if (matchCount === 5 && lotto.numbers.includes(bonusNumber)) {
        result[5.5]++;
      } else if (matchCount >= 3) {
        result[matchCount]++;
      }
    });
    return result;
  }

  countMatches(numbers, winningNumbers) {
    return numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  calculateTotalPrize(result, purchaseAmount) {
    var totalPrize =
      result[3] * LOTTO_PRIZE.FIFTH +
      result[4] * LOTTO_PRIZE.FOURTH +
      result[5] * LOTTO_PRIZE.THIRD +
      result[5.5] * LOTTO_PRIZE.SECOND +
      result[6] * LOTTO_PRIZE.FIRST;
    return ((totalPrize / purchaseAmount) * 100).toFixed(1);
  }
}

export default LottoManager;
