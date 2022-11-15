const { Console } = require("@woowacourse/mission-utils");
const { INPUT, RANKING } = require("./utils/Constants");
const {getNumberWithCommas} = require("./utils/Utils")

const printAskLottoPayment = () => {
  Console.print(INPUT.LOTTO_PAYMENT);
};

const printLottoCount = (lottoCount) => {
  Console.print(`\n${lottoCount}개를 구매했습니다.`);
};

const printIssuendLotto = (issuedLotto) => {
  issuedLotto.forEach((value) => {
    printLottoNumber(value);
  });
};

const printLottoNumber = (lottoNumber) => {
    Console.print(`[${lottoNumber.join(", ")}]`);
  };

const printRankingResult = (rankingResult) => {
  Console.print("\n당첨 통계\n---");
  for (let rankName of RANKING.OUTPUT_ORDER) {
    const rank = rankingResult.find((rank) => rank.ranking == rankName);
    if (rankName == "SECOND") {
      Console.print(RANKING.SECOND_RESULT(rank));
      continue;
    }
    Console.print(RANKING.OTHER_RESULT(rank));
  }
};

const printEarningsRate = (earningsRate) => {
  Console.print(`총 수익률은 ${getNumberWithCommas(earningsRate)}%입니다.`);
};

module.exports = {
  printAskLottoPayment,
  printLottoCount,
  printIssuendLotto,
  printRankingResult,
  printEarningsRate,
};