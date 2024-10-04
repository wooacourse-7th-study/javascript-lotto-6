import { MESSAGE } from '../constants/message.js'

class validate {
	inputMoney(inputMoney) {
		this.#isNotNumber(inputMoney)
		this.#isZeroOrminus(inputMoney)
		this.#isNotDivision(inputMoney)
	}
	randomLottoArr(randomNumber) {
		this.#isLottoOverlap(randomNumber)
		this.#isNotLengthSixLotto(randomNumber)
	}

	#isNotNumber(inputMoney) {
		if (isNaN(inputMoney)) {
			throw new Error(MESSAGE.ERROR.NOT_NUMBER)
		}
	}
	#isZeroOrminus(inputMoney) {
		if (Number(inputMoney) === 0 || Number(inputMoney) < 1) {
			throw new Error(MESSAGE.ERROR.NOT_NUMBER)
		}
	}

	#isNotDivision(inputMoney) {
		if (inputMoney % 1000 !== 0) {
			throw new Error(MESSAGE.ERROR.NOT_DIVISION)
		}
	}
	#isNotLengthSixLotto(randomNumber) {
		for (let number of randomNumber) {
			this.#isNotLengthSix(number)
		}
	}
	#isLottoOverlap(randomNumber) {
		for (let number of randomNumber) {
			this.#isNotOverLap(number)
		}
	}
}
export default validate
