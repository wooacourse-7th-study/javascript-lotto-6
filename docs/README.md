## 🎱 로또 게임 🎱

- **로또 구입 금액을 입력 받는다.**
  - validate
  - 숫자가 아닌경우
  - 0혹은 마이너스
  - 1000으로 나누었을때 나머지가 존재하는경우
- **로또 구입 개수를 계산한다.**
  - 한장에 겹치지 않은 랜덤한 숫자 1~45까지 6자리를 준다.
  - 오름차순으로 정렬한다.
  - 로또 수만큼 발행한다.
- **당첨번호를 쉼표를 기준으로 6자리 입력 받는다.**
  - validate
  - 6자리가 아닌 경우
  - 겹치는 숫자가 존재하는 경우
  - 숫자가 아닌경우
- **보너스 번호를 입력 받는다.**
  - validate
  - 숫자가 아닌 경우
  - 1~45의 숫자가 아닌 경우
- **로또 당첨 번호와 사용자의 로또를 비교하여 결과를 보여준다.**
  - 3개가 동일한 경우
  - 4개가 동일한 경우
  - 5개가 동일한 경우
    - 보너스 일치한 경우
    - 보너스 일치하지 않은 경우
  - 6개가 일치하는 경우
- **위에 결과를 합산하여 수익률을 보여준다.**