import { MissionUtils } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "../constants/message.js";

class Input {
  async inputMoney() {
    try {
      const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGES.PURCHASE_MONEY);
      return input;
    } catch (error) {
      MissionUtils.Console.print(error.message);
      this.inputMoney();
    }
  }

  async inputWinningNums() {
    try {
      const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGES.WINNING_NUM);
      return input.split(",");
    } catch (error) {
      MissionUtils.Console.print(error.message);
      this.inputWinningNums();
    }
  }

  async inputBonusNum() {
    try {
      const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGES.BONUS_NUM);
      return input;
    } catch (error) {
      MissionUtils.Console.print(error.message);
      this.inputWinningNums();
    }
  }
}

export default Input;
