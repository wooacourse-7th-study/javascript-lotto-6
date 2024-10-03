import { LOTTO, RANK } from "../constants/rules.js";

/** 당첨 정보를 관리하는 Model입니다. */
class WinTicket {
  #userRank = Array.from({ length: 6 }, () => 0);
  #profitRate;

  /**
   * 구매한 티켓, 당첨 번호, 보너스 번호를 통해 당첨 통계를 구하고, 수익률을 구해 필드에 저장합니다.
   * @param {number[][]} tickets
   * @param {number[]} winningNums
   * @param {number} bonusNum
   * @param {number} purchaseMoney
   */
  constructor(tickets, winningNums, bonusNum) {
    for (let ticket of tickets) {
      const rank = this.#calculateMatch(ticket, winningNums, bonusNum);
      if (rank) this.#userRank[rank]++;
    }
    const purchaseMoney = tickets.length * LOTTO.TICKET_PRICE;
    this.#profitRate = this.#calculateProfit(purchaseMoney, this.#userRank);
  }

  /** 당첨 통계를 계산합니다. */
  #calculateMatch(ticket, winningNums, bonusNum) {
    const matchNums = ticket.filter((num) => winningNums.includes(num));
    if (matchNums.length < 3) return;
    else if (matchNums.length === 6) return 1;
    else if (matchNums.length === 5 && ticket.includes(bonusNum)) return 2;
    else return 8 - matchNums.length;
  }

  /** 수익률을 계산합니다. */
  #calculateProfit(purchase, userRank) {
    let winMoney = 0;
    for (let i = 1; i < userRank.length; i++) {
      winMoney += userRank[i] * RANK[i].PRICE;
    }
    return Math.round((winMoney / purchase) * 1000) / 10;
  }

  /**
   * 당첨 통계를 담은 배열을 받아옵니다.
   * ex) 1등 당첨 티켓은 userRank[1]에 담겨있습니다.
   * @returns {number[]}
   */
  getUserRank() {
    return this.#userRank;
  }

  /**
   * 수익률을 받아옵니다.
   * @returns {number}
   */
  getProfitRate() {
    return this.#profitRate;
  }
}

export default WinTicket;
