export const INPUT_MESSAGES = Object.freeze({
  PURCHASE_MONEY: "구입금액을 입력해 주세요.\n",
  WINNING_NUM: "\n당첨 번호를 입력해 주세요.\n",
  BONUS_NUM: "\n보너스 번호를 입력해 주세요.\n",
});

export const OUTPUT_MESSAGES = Object.freeze({
  PURCHASE: (amount) => `\n${amount}개를 구매했습니다.`,
  RESULT_STATEMENT: "\n당첨 통계\n---",
});

export const ERROR_MESSAGES = Object.freeze({
  ONLY_NUMBER: "[ERROR] 숫자만 입력할 수 있습니다.",
  DUPLICATE: "[ERROR] 로또 번호는 중복될 수 없습니다.",
  BLANK: "[ERROR] 공백은 입력 불가합니다.",
  NOT_RIGHT_UNIT: (unit) => `[ERROR] ${unit}원 단위로만 입력 가능합니다.`,
  LOTTO_COUNT: (count) => `[ERROR] 로또 번호는 ${count}개여야 합니다.`,
  NUM_RANGE: (min, max) => `[ERROR] 로또 번호는 ${min} ~ ${max} 사이에 있어야 합니다.`,
});
