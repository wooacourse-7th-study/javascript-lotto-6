import { Console } from "@woowacourse/mission-utils";
import LottoManager from "./LottoManager.js";
import { INPUT_MESSAGE, PRINT_MESSAGE } from "./constants/lottoMessage.js";
import { LOTTO_PRIZE } from "./constants/lottoRule.js";

class LottoGame {
  constructor() {
    this.lottoManager = new LottoManager();
  }

  async start() {
    const purchaseAmount = await this.getPurchaseAmount();
    const lottos = this.lottoManager.buyLottos(purchaseAmount);
    this.printPurchasedLottos(lottos);

    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);

    const result = this.lottoManager.checkWinningResult(
      lottos,
      winningNumbers,
      bonusNumber
    );
    this.printWinningStatistics(result, purchaseAmount);
  }

  async getPurchaseAmount() {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          INPUT_MESSAGE.PURCHASE_AMOUNT
        );
        const amount = parseInt(input);
        this.lottoManager.validatePurchaseAmount(amount);
        return amount;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  printPurchasedLottos(lottos) {
    Console.print(PRINT_MESSAGE.PURCHASE_AMOUNT(lottos.length));
    lottos.forEach((lotto) => Console.print(`[${lotto.numbers.join(", ")}]`));
    Console.print("");
  }

  async getWinningNumbers() {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          INPUT_MESSAGE.WINNING_NUMBERS
        );
        return this.lottoManager.parseWinningNumbers(input);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await Console.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
        return this.lottoManager.parseBonusNumber(input, winningNumbers);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  printWinningStatistics(result, purchaseAmount) {
    Console.print(PRINT_MESSAGE.WINNING_STATISTICS);
    Console.print(PRINT_MESSAGE.LOTTO_WINNER(3, LOTTO_PRIZE.FIFTH, result[3]));
    Console.print(PRINT_MESSAGE.LOTTO_WINNER(4, LOTTO_PRIZE.FOURTH, result[4]));
    Console.print(PRINT_MESSAGE.LOTTO_WINNER(5, LOTTO_PRIZE.THIRD, result[5]));
    Console.print(
      PRINT_MESSAGE.LOTTO_WINNER(5, LOTTO_PRIZE.SECOND, result[5.5], true)
    );
    Console.print(PRINT_MESSAGE.LOTTO_WINNER(6, LOTTO_PRIZE.FIRST, result[6]));

    const returnRate = this.lottoManager.calculateTotalPrize(
      result,
      purchaseAmount
    );
    Console.print(PRINT_MESSAGE.RATE_OF_RETURN(returnRate));
  }
}

export default LottoGame;
