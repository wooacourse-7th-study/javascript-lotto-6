import { MissionUtils } from "@woowacourse/mission-utils";

class Input {
  async inputMoney() {
    try {
      const input = await MissionUtils.Console.readLineAsync("구입금액을 입력해 주세요.\n");
      return input;
    } catch (error) {
      MissionUtils.Console.print(error.message);
      this.inputMoney();
    }
  }
}

export default Input;
