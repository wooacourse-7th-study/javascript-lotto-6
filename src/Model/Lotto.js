import { LOTTO } from "../constants/rules.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    for (let number of numbers) {
      this.#validateEachNum(number);
    }
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.NUM_COUNT)
      throw new Error(`[ERROR] 로또 번호는 ${LOTTO.NUM_COUNT}개여야 합니다.`);

    const setNums = new Set(numbers);
    if (setNums.size !== numbers.length) throw new Error("[ERROR] 로또 번호는 중복될 수 없습니다.");
  }

  // TODO: 추가 기능 구현
  #validateEachNum(number) {
    if (isNaN(number)) throw new Error("[ERROR] 로또 번호는 숫자만 입력 가능합니다.");
    if (number.trim() === "") throw new Error("[ERROR] 공백은 입력 불가합니다.");
    if (number < LOTTO.MIN_NUM || number > LOTTO.MAX_NUM)
      throw new Error(
        `[ERROR] 로또 번호는 ${LOTTO.MIN_NUM} ~ ${LOTTO.MAX_NUM} 사이에 있어야 합니다.`
      );
  }

  getWinningNumbers() {
    return this.#numbers.map((val) => Number(val));
  }
}

export default Lotto;
