import { MESSAGES } from "./constants";

class Lotto {
  #numbers; // 클래스 외부에서 접근 불가

  // 객체가 생성될 때 호출
  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  // 유효성 검사
  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(MESSAGES.SIX_LENGTH_LOTTO_NUMBER);
    }
  }
}

export default Lotto;
