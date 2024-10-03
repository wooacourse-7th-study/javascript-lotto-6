import { MissionUtils } from "@woowacourse/mission-utils";
import { RANK } from "../constants/rules.js";

class Output {
  outputTicketAmount(amount) {
    MissionUtils.Console.print(`\n${amount}개를 구매했습니다.`);
  }

  outputTickets(tickets) {
    for (let i = 0; i < tickets.length; i++) {
      MissionUtils.Console.print(tickets[i]);
    }
  }

  printResult(resultArr) {
    MissionUtils.Console.print("\n당첨 통계\n---");
    for (let rank = 5; rank > 0; rank -= 1) {
      const COUNT = resultArr[rank];
      const RANK_STRING = RANK[rank].STRING;
      MissionUtils.Console.print(RANK_STRING + " - " + COUNT + "개");
    }
  }
}

export default Output;
