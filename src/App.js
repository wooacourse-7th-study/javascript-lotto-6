import Lotto from "./Lotto.js";

class App {
  async play() {
    const lotto = new Lotto();
    // 로또 구매 금액 입력
    const price = await lotto.getUserInputLottoPrice();

    // 로또 번호 생성, 출력
    const lottoNumbersStore = lotto.getLottoNumbers(price);
    lotto.printLottoNumbers(lottoNumbersStore);

    // 당첨 번호 입력
    const userLottoNumbers = await lotto.getUserInputLottoNumber();

    // 보너스 번호 입력
    const bonusNumber = await lotto.getUserInputBonusNumber();

    // 로또 결과 처리, 출력
    const { result, prizeMoney } = lotto.getLottoResult(userLottoNumbers, bonusNumber, lottoNumbersStore);
    lotto.printResult(result, price, prizeMoney);
  }
}

const app = new App();
app.play();

export default App;
