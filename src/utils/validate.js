import { MESSAGE } from '../constants/message.js'

class validate {
	inputMoney(inputMoney) {
		this.#isNotNumber(inputMoney)
		this.#isZeroOrminus(inputMoney)
		this.#isNotDivision(inputMoney)
	}
	inputWinner(splitNumber) {
		this.#isNotLengthSix(splitNumber)
		this.#isNotOverLap(splitNumber)
		this.#isNotNumberArr(splitNumber)
	}
	inputBonus(inputBonusNumber) {
		this.#isNotNumber(inputBonusNumber)
		this.#isLottoRange(inputBonusNumber)
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
	#isNotNumberArr(splitNumber) {
		for (let number of splitNumber) {
			if (number.trim() === '') {
				throw new Error(MESSAGE.ERROR.NOT_VALUE)
			}
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

	#isNotLengthSix(splitNumber) {
		if (splitNumber.length !== 6) {
			throw new Error(MESSAGE.ERROR.NOT_VALUE)
		}
	}
	#isNotLengthSixLotto(randomNumber) {
		for (let number of randomNumber) {
			this.#isNotLengthSix(number)
		}
	}
	#isNotOverLap(splitNumber) {
		const set = new Set(splitNumber)
		if (splitNumber.length !== set.size) {
			throw new Error(MESSAGE.ERROR.ISOVERLAP_CARNAME)
		}
	}
	#isLottoRange(inputBonusNumber) {
		if (inputBonusNumber < 1 && inputBonusNumber > 45) {
			throw new Error(MESSAGE.ERROR.NOT_NUMBER)
		}
	}
	#isLottoOverlap(randomNumber) {
		for (let number of randomNumber) {
			this.#isNotOverLap(number)
		}
	}
}
export default validate
