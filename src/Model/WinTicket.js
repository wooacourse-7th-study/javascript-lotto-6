import { RANK } from "../constants/rules.js";

class WinTicket {
  #userRank = Array.from({ length: 6 }, () => 0);
  #profitRate;

  constructor(tickets, winningNums, bonusNum, purchaseMoney) {
    for (let ticket of tickets) {
      const rank = this.#calculateMatch(ticket, winningNums, bonusNum);
      if (rank) this.#userRank[rank]++;
    }
    this.#profitRate = this.#calculateProfit(purchaseMoney, this.#userRank);
  }

  #calculateMatch(ticket, winningNums, bonusNum) {
    const matchNums = ticket.filter((num) => winningNums.includes(num));
    if (matchNums.length < 3) return;
    else if (matchNums.length === 6) return 1;
    else if (matchNums.length === 5 && ticket.includes(bonusNum)) return 2;
    else return 8 - matchNums.length;
  }

  #calculateProfit(purchase, userRank) {
    let winMoney = 0;
    for (let i = 1; i < userRank.length; i++) {
      winMoney += userRank[i] * RANK[i].PRICE;
    }
    return Math.round((winMoney / purchase) * 1000) / 10;
  }

  getUserRank() {
    return this.#userRank;
  }

  getProfitRate() {
    return this.#profitRate;
  }
}

export default WinTicket;
