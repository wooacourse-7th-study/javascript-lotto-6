import { MissionUtils } from "@woowacourse/mission-utils";

class Output {
  outputTicketAmount(amount) {
    MissionUtils.Console.print(`\n${amount}개를 구매했습니다.`);
  }
}

export default Output;
