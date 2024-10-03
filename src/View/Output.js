import { MissionUtils } from "@woowacourse/mission-utils";

class Output {
  outputTicketAmount(amount) {
    MissionUtils.Console.print(`\n${amount}개를 구매했습니다.`);
  }

  outputTickets(tickets) {
    for (let i = 0; i < tickets.length; i++) {
      MissionUtils.Console.print(tickets[i]);
    }
  }
}

export default Output;
