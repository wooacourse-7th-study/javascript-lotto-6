import { MissionUtils } from "@woowacourse/mission-utils";
import { RANK } from "../constants/rules.js";
import { OUTPUT_MESSAGES } from "../constants/message.js";

class Output {
  outputTicketAmount(amount) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.PURCHASE(amount));
  }

  outputTickets(tickets) {
    for (let i = 0; i < tickets.length; i++) {
      MissionUtils.Console.print(tickets[i]);
    }
  }

  printResult(resultArr) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.RESULT_STATEMENT);
    for (let rank = 5; rank > 0; rank -= 1) {
      const COUNT = resultArr[rank];
      const RANK_STRING = RANK[rank].STRING;
      MissionUtils.Console.print(RANK_STRING + " - " + COUNT + "개");
    }
  }
}

export default Output;
