import { MissionUtils } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "../constants/message.js";

/** 입력과 관련된 로직들을 관리하는 class입니다. */
class Input {
  /** 로또 총 구매 금액을 입력받습니다. */
  async inputMoney() {
    try {
      const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGES.PURCHASE_MONEY);
      return input;
    } catch (error) {
      MissionUtils.Console.print(error.message);
      this.inputMoney();
    }
  }

  /** 로또 당첨 번호를 입력받습니다. */
  async inputWinningNums() {
    try {
      const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGES.WINNING_NUM);
      return input.split(",");
    } catch (error) {
      MissionUtils.Console.print(error.message);
      this.inputWinningNums();
    }
  }

  /** 로또 보너스 번호를 입력받습니다. */
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
