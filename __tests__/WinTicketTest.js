import WinTicket from "../src/Model/WinTicket";

describe("당첨 티켓 클래스 테스트", () => {
  test("구매한 티켓, 당첨 번호, 보너스 번호를 통해 구한 당첨 통계와 수익률 테스트", () => {
    const winTicket = new WinTicket(
      [
        [8, 21, 23, 41, 42, 43],
        [3, 5, 11, 16, 32, 38],
        [7, 11, 16, 35, 36, 44],
        [1, 8, 11, 31, 41, 42],
      ],
      [1, 8, 11, 31, 41, 44],
      42
    );
    expect(winTicket.getUserRank()).toEqual([0, 0, 1, 0, 0, 0]);
    expect(winTicket.getProfitRate()).toEqual(750000);
  });
});
