import { MissionUtils } from "@woowacourse/mission-utils";
import { RANK } from "../constants/rules.js";
import { OUTPUT_MESSAGES } from "../constants/message.js";

/** 출력과 관련된 로직들을 관리하는 class입니다. */
class Output {
  /** 구매 금액에 따른 티켓 개수를 출력합니다. */
  outputTicketAmount(amount) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.PURCHASE(amount));
  }

  /** 각 티켓의 로또 번호를 출력합니다. */
  outputTickets(tickets) {
    for (let i = 0; i < tickets.length; i++) {
      const ticketString = tickets[i].join(", ");
      MissionUtils.Console.print(`[${ticketString}]`);
    }
  }

  /** 당첨 통계와 수익률을 출력합니다. */
  printResult(resultArr, profitRate) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.RESULT_STATEMENT);
    for (let rank = 5; rank > 0; rank--) {
      const COUNT = resultArr[rank];
      const RANK_STRING = RANK[rank].STRING;
      MissionUtils.Console.print(RANK_STRING + " - " + COUNT + "개");
    }
    MissionUtils.Console.print(OUTPUT_MESSAGES.PROFIT_RATE(profitRate));
  }
}

export default Output;
