import Lotto from "../src/Lotto";
import { MESSAGES } from "../src/constants/index.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockInputs = (input) => {
  MissionUtils.Console.readLineAsync = jest.fn(() => {
    return Promise.resolve(input);
  });
};

describe("유저 인풋 테스트(유효성 검사)", () => {
  // 가격
  test("로또 가격 유효성 검사", async () => {
    // given
    const price = "1100";
    mockInputs(price);

    // when
    const lotto = new Lotto();

    // then
    await expect(lotto.getUserInputLottoPrice()).rejects.toThrow(MESSAGES.INVALID_LOTTO_PRICE);
  });

  // 로또 번호
  test("로또 번호 개수 검사", async () => {
    // given
    const numbers = "1,2,3,4,5,6,7";
    mockInputs(numbers);

    // when
    const lotto = new Lotto();

    // then
    await expect(lotto.getUserInputLottoNumber()).rejects.toThrow(MESSAGES.SIX_LENGTH_LOTTO_NUMBER);
  });

  test("로또 번호 범위 검사", async () => {
    // given
    const numbers = "0,2,3,4,5,46";
    mockInputs(numbers);

    // when
    const lotto = new Lotto();

    // then
    await expect(lotto.getUserInputLottoNumber()).rejects.toThrow(MESSAGES.INVALID_LOTTO_NUMBER);
  });

  test("로또 번호 중복 검사", async () => {
    // given
    const numbers = "1,2,3,4,5,5";
    mockInputs(numbers);

    // when
    const lotto = new Lotto();

    // then
    await expect(lotto.getUserInputLottoNumber()).rejects.toThrow(MESSAGES.DUPLICATE_LOTTO_NUMBER);
  });
});
