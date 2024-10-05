/** 로또 게임의 룰과 관련된 상수들입니다. */
export const LOTTO_RULES = Object.freeze({
  NUM_COUNT: 6,
  MIN_NUM: 1,
  MAX_NUM: 45,
  TICKET_PRICE: 1000,
  PURCHASE_UNIT: 1000,
});

/** 로또 게임의 당첨 등수별 출력 메시지와 가격을 담은 객체입니다. */
export const RANK = Object.freeze({
  1: { STRING: "6개 일치 (2,000,000,000원)", PRICE: 2000000000 },
  2: { STRING: "5개 일치, 보너스 볼 일치 (30,000,000원)", PRICE: 30000000 },
  3: { STRING: "5개 일치 (1,500,000원)", PRICE: 1500000 },
  4: { STRING: "4개 일치 (50,000원)", PRICE: 50000 },
  5: { STRING: "3개 일치 (5,000원)", PRICE: 5000 },
});
