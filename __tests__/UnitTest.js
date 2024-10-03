import Lotto from "../src/Lotto.js";
import { MESSAGES } from "../src/constants/lotto.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockInputs = (input) => {
  MissionUtils.Console.readLineAsync = jest.fn(() => {
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
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

  // 보너스 번호
  test("보너스 번호 번호 범위 검사", async () => {
    // given
    const numbers = "46";
    mockInputs(numbers);

    // when
    const lotto = new Lotto();

    // then
    await expect(lotto.getUserInputBonusNumber()).rejects.toThrow(MESSAGES.INVALID_LOTTO_NUMBER);
  });

  test("로또 번호 중복 검사", async () => {
    // given
    const userLottoNumbers = [1, 2, 3, 4, 5, 6];
    const numbers = "6";
    mockInputs(numbers);

    // when
    const lotto = new Lotto();

    // then
    await expect(lotto.getUserInputBonusNumber(userLottoNumbers)).rejects.toThrow(MESSAGES.DUPLICATE_LOTTO_NUMBER);
  });
});

describe("로또 번호 테스트", () => {
  // 로또 번호 생성
  test("로또 가격에 맞게 로또를 발행하는지 테스트", () => {
    // given
    const price = 5000;
    const expectedLength = 5;

    // when
    const lotto = new Lotto();

    // then
    expect(lotto.getLottoNumbers(price)).toHaveLength(expectedLength);
  });

  // 로또 번호 유효성 검사
  test("발행한 로또 번호 오름차순 검사", () => {
    // given
    const price = 1000;

    // when
    const lotto = new Lotto();
    const numbers = lotto.getLottoNumbers(price)[0];

    // then
    for (let i = 0; i < numbers.length - 1; i++) {
      const currentTarget = numbers[i];
      const nextTarget = numbers[i + 1];
      // 현재 값이 다음 값보다 작아야 한다.
      expect(currentTarget).toBeLessThan(nextTarget);
    }
  });

  // 로또 번호 출력
  test("로또 번호 출력 검사", () => {
    // given
    const lottoNumbersStore = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ];
    const logSpy = getLogSpy();

    // when
    const lotto = new Lotto();
    lotto.printLottoNumbers(lottoNumbersStore);

    // then
    lottoNumbersStore.forEach((numbers, index) => {
      const expectedOutput = `[${numbers.join(", ")}]`;
      // toHaveBeenNthCalledWith는 1부터 시작
      expect(logSpy).toHaveBeenNthCalledWith(index + 1, expectedOutput);
    });
  });
});

describe("로또 번호 결과 테스트", () => {
  // 로또 번호 결과 처리
  test("로또 번호 결과 처리", () => {
    // given
    const userLottoNumbers = [1, 2, 3, 4, 5, 6];
    const userBonusNumber = 7;
    const lottoNumbersStore = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ];
    const resultOutput = [
      [3, 0],
      [4, 0],
      [5, 0],
      ["5B", 0],
      [6, 1],
    ];
    const prizeMoneyOutput = 2000000000;

    // when
    const lotto = new Lotto();
    const { result, prizeMoney } = lotto.getLottoResult(userLottoNumbers, userBonusNumber, lottoNumbersStore);

    // then
    expect(result).toEqual(resultOutput);
    expect(prizeMoney).toEqual(prizeMoneyOutput);
  });

  // 결과 출력
  test("로또 번호 결과 처리", () => {
    // given
    const result = [
      [3, 0],
      [4, 0],
      [5, 0],
      ["5B", 0],
      [6, 1],
    ];
    const price = 1000;
    const prizeMoney = 2000000000;
    const outputs = [
      "\n당첨 통계\n---",
      "3개 일치 (5,000원) - 0개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 1개",
      "총 수익률은 199,999,900%입니다.",
    ];
    const logSpy = getLogSpy();

    // when
    const lotto = new Lotto();
    lotto.printResult(result, price, prizeMoney);

    // then
    expect(logSpy).toHaveBeenCalledTimes(outputs.length);
    outputs.forEach((output, index) => {
      expect(logSpy).toHaveBeenNthCalledWith(index + 1, output);
    });
  });
});
