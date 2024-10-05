import { ERROR_MESSAGES } from "../src/constants/message";
import { LOTTO_RULES } from "../src/constants/rules";
import BonusNumber from "../src/Model/BonusNumber";

describe("보너스 번호 클래스 테스트", () => {
  test("보너스 번호는 숫자여야 한다.", () => {
    expect(() => {
      new BonusNumber("hi");
    }).toThrow(ERROR_MESSAGES.ONLY_NUMBER);
  });

  const BONUS_DUPLICATE_CASE = [["1", ["1", "2", "3", "4", "5", "6"]]];
  test.each(BONUS_DUPLICATE_CASE)(
    "보너스 번호는 기존의 번호와 중복되면 안된다.",
    (input, winningNums) => {
      expect(() => {
        new BonusNumber(input, winningNums);
      }).toThrow(ERROR_MESSAGES.DUPLICATE);
    }
  );

  const BONUS_OUT_OF_RANGE_CASE = [
    ["0", ["1", "2", "3", "4", "5", "6"]],
    ["49", ["1", "2", "3", "4", "5", "6"]],
  ];
  test.each(BONUS_OUT_OF_RANGE_CASE)(
    "로또 번호 범위를 넘어가면 예외가 발생한다.",
    (numbers, winningNums) => {
      expect(() => {
        new BonusNumber(numbers, winningNums);
      }).toThrow(ERROR_MESSAGES.NUM_RANGE(LOTTO_RULES.MIN_NUM, LOTTO_RULES.MAX_NUM));
    }
  );
});
