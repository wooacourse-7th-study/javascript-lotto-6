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

  printResult(resultArr) {
    MissionUtils.Console.print(`\n당첨 통계
---
3개 일치 (5,000원) - ${resultArr[5]}개
4개 일치 (50,000원) - ${resultArr[4]}개
5개 일치 (1,500,000원) - ${resultArr[3]}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${resultArr[2]}개
6개 일치 (2,000,000,000원) - ${resultArr[1]}개`);
  }
}

export default Output;
