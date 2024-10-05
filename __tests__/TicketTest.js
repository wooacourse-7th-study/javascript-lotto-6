import { ERROR_MESSAGES } from "../src/constants/message";
import { LOTTO_RULES } from "../src/constants/rules";
import Ticket from "../src/Model/Ticket";

describe("티켓 클래스 테스트", () => {
  test("구입 금액이 숫자여야 한다.", () => {
    expect(() => {
      new Ticket("hi");
    }).toThrow(ERROR_MESSAGES.ONLY_NUMBER);
  });

  test("구입 금액이 단위에 나눠 떨어져야한다.", () => {
    expect(() => {
      new Ticket("500");
    }).toThrow(ERROR_MESSAGES.NOT_RIGHT_UNIT(LOTTO_RULES.PURCHASE_UNIT));
  });

  const AMOUNT_TEST_CASE = [
    ["5000", 5],
    ["132000", 132],
  ];
  test.each(AMOUNT_TEST_CASE)("구입 금액에 따른 티켓 개수 계산 test", (input, amount) => {
    const ticket = new Ticket(input);
    expect(ticket.getAmount()).toEqual(amount);
  });
});
