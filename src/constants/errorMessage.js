export const ERROR_MESSAGE = Object.freeze({
  NOT_A_NUMBER: "[ERROR] 숫자만 입력할 수 있습니다.",
  NOT_ENOUGH_NUMBERS: (length) => `[ERROR] 로또 번호는 ${length}개여야 합니다.`,
  INPUT_DUPLICATION: "[ERROR] 중복된 번호가 입력되었습니다.",
  OUT_OF_RANGE: (min, max) =>
    `[ERROR] ${min}~${max} 사이의 번호만 입력할 수 있습니다.`,
  INVALID_PURCHASE_AMOUNT: (price) =>
    `[ERROR] 구입 금액은 ${price}원 단위로 입력해 주세요.`,
  INVALID_WINNING_NUMBERS: (length) =>
    `[ERROR] 당첨 번호는 ${length}개여야 합니다.`,
  INVALID_BONUS_NUMBER: (min, max) =>
    `[ERROR] 보너스 번호는 ${min}부터 ${max} 사이의 숫자여야 합니다.`,
  DUPLICATE_BONUS_NUMBER:
    "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
});
