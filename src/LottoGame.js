class LottoGame {
	#lottoAmount //로또 개수
	async start() {
		await this.inputMoneyAndLottoAmount()
	}

	//돈 입력 및 로또 구매 수 출력
	async inputMoneyAndLottoAmount() {
		const userInputPrice = await MissionUtils.Console.readLineAsync(
			MESSAGE.INPUT.PRICE_NUMBER,
		)
		const Validate = new validate()
		Validate.inputMoney(userInputPrice)
		this.#lottoAmount = userInputPrice / 1000
		MissionUtils.Console.print(`\n${this.#lottoAmount}개를 구매했습니다.`)
	}

	}
}
export default LottoGame
