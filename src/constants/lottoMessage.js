export const INPUT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
  WINNING_NUMBERS: "\n당첨 번호를 입력해 주세요.\n",
  BONUS_NUMBER: "보너스 번호를 입력해 주세요.\n",
});

export const PRINT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: (count) => `${count}개를 구매했습니다.\n`,
  WINNING_STATISTICS: "당첨 통계\n---\n",
  LOTTO_WINNER: (matchCount, prize, count, isBonus = false) =>
    `${matchCount}개 일치${
      isBonus ? ", 보너스 볼 일치" : ""
    } (${prize.toLocaleString()}원) - ${count}개\n`,
  RATE_OF_RETURN: (rate) => `총 수익률은 ${rate.toLocaleString()}%입니다.\n`,
});
