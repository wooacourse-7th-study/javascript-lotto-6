import { MESSAGE } from '../constants/message.js'

class validate {
	inputMoney(inputMoney) {
		this.#isNotNumber(inputMoney)
		this.#isZeroOrminus(inputMoney)
		this.#isNotDivision(inputMoney)
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
}
export default validate
