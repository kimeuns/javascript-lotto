const Lotto = require('./Lotto.js')
const Buyer = require('./Buyer.js')
const {Console, Random} = require("@woowacourse/mission-utils");

const ASK_LOTTO_PRICE = "구입금액을 입력해 주세요.";
const ASK_WINNING_LOTTO_NUMBER = "당첨 번호를 입력해 주세요.";
const ASK_BONUS_LOTTO_NUMBER = "보너스 번호를 입력해 주세요.";

class App {
  lottoPayment;
  lottoCount;
  issuedLotto = [];
  winningLottoNumber;
  BonusLottoNumber;
  rankingResult = [
    {
      rank: 1,
      matchCount: 6,
      reword: 2000000000,
      count: 0,
    },
    {
      rank: 2,
      matchCount: 5,
      reword: 30000000,
      count: 0,
    },
    {
      rank: 3,
      matchCount: 5,
      reword: 1500000,
      count: 0,
    },
    {
      rank: 4,
      matchCount: 4,
      reword: 50000,
      count: 0,
    },
    {
      rank: 5,
      matchCount: 3,
      reword: 5000,
      count: 0,
    },
  ];

  buyLotto(price) {
    const buyer = new Buyer(price);
    this.lottoCount = buyer.lottoCount;
  }

  printLottoCount(lottoCount) {
    Console.print(`\n${lottoCount}개를 구매했습니다`);
  }

  makeLottoNumber() {
    return Random.pickUniqueNumbersInRange(1, 45, 6);
  }

  sortLottoNumberInAscendignOrder(lottoNumber) {
    return lottoNumber.sort((a, b) => a - b);
  }

  printLottoNumber(lottoNumber) {
    return Console.print(`[${lottoNumber.join(", ")}]`);
  }

  makeissuedLotto(lottoCount) {
    for (let i = 0; i < lottoCount; i++) {
      let lottoNumber = this.sortLottoNumberInAscendignOrder(
        this.makeLottoNumber()
      );
      this.issuedLotto.push(lottoNumber);
    }
  }

  printIssuendLotto(issuedLotto) {
    issuedLotto.forEach((value) => {
      this.printLottoNumber(value);
    });
  }

  getWinningLottoNumber() {
    Console.print(`\n${ASK_WINNING_LOTTO_NUMBER}`);
    Console.readline("", (input) => {
      const inputValue = input.split(",").map(Number);
      this.isValidinput(inputValue);
      this.winningLottoNumber = inputValue;
    });
  }

  isValidLottoNumber(inputValue) {
    inputValue.forEach((value) => {
      if (isNaN(value)) {
        throw new Error("[ERROR] 로또 번호는 숫자여야 합니다.");
      }
      if (value < 1 || value > 45) {
        throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
      }
    });
    if ([...new Set(inputValue)].length !== 6) {
      throw new Error("[ERROR] 로또 번호는 중복되지 않는 숫자여야 합니다.");
    }
  }

  getBonusLottoNumber() {
    Console.print(`\n${ASK_BONUS_LOTTO_NUMBER}`);
    Console.readline("", (input) => {
      this.isValidBonusNumber(input);
      this.BonusLottoNumber = Number(input);
    });
  }

  isValidBonusNumber(input) {
    if (isNaN(input)) throw new Error("[ERROR] 보너스 번호는 숫자여야 합니다.");
    if (this.winningLottoNumber.includes(+input)) {
      throw new Error(
        "[ERROR] 보너스 번호는 로또 번호와 중복되지 않는 숫자여야 합니다."
      );
    }
    if (input.length() !== 1) {
      throw new Error("[ERROR] 보너스 번호는 하나입니다.");
    }
  }

  calculateOverlappintNumberCount(lottoNumber, winningLottoNumber) {
    return lottoNumber.reduce((sum, number) => {
      winningLottoNumber.includes(number) ? (sum += 1) : null;
      return sum;
    }, 0);
  }

  hasBounsNumber(lottoNumber, bounsLotto) {
    return lottoNumber.includes(bounsLotto);
  }

  makeRankingResult(issuedLotto, winningLottoNumber, bounsLotto) {
    issuedLotto.forEach((lotto) => {
      let matchCount = this.calculateOverlappintNumberCount(
        lotto,
        winningLottoNumber
      );
      if (matchCount == 6) this.rankingResult[0].count += 1;
      if (matchCount == 5 && this.hasBounsNumber(lotto, bounsLotto)) {
        this.rankingResult[1].count += 1;
      }
      if (matchCount == 5 && !this.hasBounsNumber(lotto, bounsLotto)) {
        this.rankingResult[1].count += 1;
      }
      if (matchCount == 4) {
        this.rankingResult[2].count += 1;
      }
      if (matchCount == 3) {
        this.rankingResult[3].count += 1;
      }
    });
  }

  printRankingResult(rankingResult) {
    Console.print("\n당첨 통계\n---");
    rankingResult.forEach((value) => {
      Console.print(
        `${value.matchCount}개 일치 (${value.reword}원) - ${value.count}개`
      );
    });
  }

  caclulateEarningsRate(rankingResult, lottoPayment){
    const totalReword = rankingResult.reduce((sum,value)=>{
      sum += value.reword * value.count;
      return sum;
    },0)
    const percentage= (totalReword/lottoPayment)*100
    return Number(percentage.toFixed(1));
  }

  printEarningsRate(){
    const earningRate = this.caclulateEarningsRate(this.rankingResult,8000)
    Console.print(`총 수익률은 ${earningRate}%입니다.`)
  }

  play() {
    Console.print(ASK_LOTTO_PRICE);
    // Console.readLine('',price => this.buyLotto(price))

    this.makeissuedLotto(8);
    this.printIssuendLotto(this.issuedLotto);
    this.makeRankingResult(this.issuedLotto, [1, 2, 3, 4, 5, 6], 7);
    this.printRankingResult(this.rankingResult)
    this.printEarningsRate();
  }
}

const app = new App();
app.play();

// module.exports = App;