class LottoGame {
	#lottoAmount //로또 개수

	#lottoRandomNumberArr = [] //로또 랜덤값 배열 (이중 배열)
	async start() {
		await this.inputMoneyAndLottoAmount()
		this.randomNumberArr()
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

	//랜덤한 값 배열로
	randomNumberArr() {
		for (let i = 0; i < this.#lottoAmount; i++) {
			const randomNum = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)
			randomNum.sort((a, b) => a - b)
			this.#lottoRandomNumberArr.push(randomNum)
			MissionUtils.Console.print(randomNum)
		}
	}
	}
}
export default LottoGame
