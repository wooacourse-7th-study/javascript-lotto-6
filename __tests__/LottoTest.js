import { ERROR_MESSAGES } from "../src/constants/message.js";
import { LOTTO } from "../src/constants/rules.js";
import Lotto from "../src/Model/Lotto.js";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 이 테스트가 통과할 수 있게 구현 코드 작성
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // 아래에 추가 테스트 작성 가능
  test("로또 번호에 숫자가 아닌 입력값이 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto(["1", "2", "3", "4", "5", "hi"]);
    }).toThrow(ERROR_MESSAGES.ONLY_NUMBER);
  });

  test("공백이 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto(["1", "2", "3", "4", "5", "   "]);
    }).toThrow(ERROR_MESSAGES.BLANK);
  });

  test.each([[["1", "2", "3", "4", "5", "49"]], [["0", "3", "5", "7", "9", "12"]]])(
    "로또 번호 범위를 넘어가면 예외가 발생한다.",
    (numbers) => {
      expect(() => {
        new Lotto(numbers);
      }).toThrow(ERROR_MESSAGES.NUM_RANGE(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }
  );
});
