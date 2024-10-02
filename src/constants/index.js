export const MESSAGES = Object.freeze({
  INVALID_LOTTO_PRICE: "[ERROR] 로또 가격은 1000원 단위로 입력해 주세요.",
  SIX_LENGTH_LOTTO_NUMBER: "[ERROR] 쉼표를 기준으로 6개의 숫자만 입력 가능합니다.",
  DUPLICATE_LOTTO_NUMBER: "[ERROR] 중복된 숫자가 있습니다.",
  INVALID_LOTTO_NUMBER: "[ERROR] 1부터 45까지의 숫자만 입력 가능합니다.",
  INPUT_LOTTO_PRICE: "구입금액을 입력해 주세요.\n",
  BUY_LOTTO: "개를 구매했습니다.",
  INPUT_LOTTO_NUMBER: "당첨 번호를 입력해 주세요.\n",
  INPUT_BONUS_NUMBER: "보너스 번호을 입력해 주세요.\n",
  RESULT_LOTTO: "당첨 통계\n---",
  REVENUE_RATE: (revenueRate) => `총 수익률은 ${revenueRate}%입니다.`,
});

export const LOTTO_NUMBER = Object.freeze({
  MIN: 1,
  MAX: 45,
  LENGTH: 6,
  DIVISION_PRICE: 1000,
});

export const PRIZE_MONEY = Object.freeze({
  3: 5000,
  4: 50000,
  5: 1500000,
  "5B": 30000000,
  6: 2000000000,
});
