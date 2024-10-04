import LottoGame from './LottoGame.js'

class App {
	async play() {
		const lottoGame = new LottoGame()
		lottoGame.start()
	}
}

const app = new App()
app.play()
export default App
