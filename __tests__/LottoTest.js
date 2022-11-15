const Lotto = require("../src/models/Lotto");
const LottoPayment = require("../src/models/LottoPayment");
const LottoIsuued = require("../src/models/LottoIssued");
const LottoWinning = require("../src/models/LottoWinning");
const {ERROR} = require("../src/utils/Constants")
const {
  getMatchedinWinningNumberCount,
  getEarningsRate,
  hasBounsNumber,
} = require("../src/utils/Utils");

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR.LOTTO_COUNT);
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR.LOTTO_DUPLICATE);
  });

  test("로또 번호에 1보다 작거나 45보다 큰 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow(ERROR.LOTTO_RANGE);
  });

  test("로또 번호에 문자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, "h"]);
    }).toThrow(ERROR.LOTTO_TYPE);
  });
});

describe("발행한 로또 클래스 테스트",()=>{
  test("로또 구매 개수를 입력 받는다.",()=>{
    const lottoCount = 3;
    const output = 3;

    const lottoIssued = new LottoIsuued(lottoCount)

    return expect(lottoIssued.lottoIssued).toHaveLength(output)
  })
})

describe("구매 금액 테스트", () => {
  test("구매 금액은 1000단위만 입력 가능하다.", () => {
    const input = 1500;
    expect(() => {
      new LottoPayment(input);
    }).toThrow();
  });

  test("구매 금액은 숫자만 입력 가능하다.", () => {
    const input = "testPayment";
    expect(() => {
      new LottoPayment(input);
    }).toThrow();
  });

  test("로또금액에 따른 구매가능한 로또 개수를 계산한다.", () => {
    const input = 8000;
    const output = 8;

    const buyer = new LottoPayment(input);

    return expect(buyer.lottoCount).toEqual(output);
  });
});

describe("당첨 로또 테스트", () => {
  test("당첨 번호는 숫자만 입력 가능합니다.", () => {
    const input = "1,2,3,4,5,k";

    const winnigLotto = new LottoWinning();

    expect(() => {
      winnigLotto.setWinningLotto(input);
    }).toThrow();
  });

  test("당첨 번호에 중복된 숫자는 입력할 수 없습니다.", () => {
    const input = "1,2,3,4,5,5";

    const winnigLotto = new LottoWinning();

    expect(() => {
      winnigLotto.setWinningLotto(input);
    }).toThrow();
  });

  test("당첨 번호에 범위 외 숫자는 입력할 수 없습니다.", () => {
    const input = "1,2,3,4,5,50";

    const winnigLotto = new LottoWinning();

    expect(() => {
      winnigLotto.setWinningLotto(input);
    }).toThrow();
  });

  test("보너스 번호는 숫자여야 합니다.", () => {
    const input = "k";

    const winnigLotto = new LottoWinning();

    expect(() => {
      winnigLotto.setBonusNumber(input);
    }).toThrow();
  });

  test("보너스 번호는 당첨 번호와 중복되지 않습니다.", () => {
    const winningInput = "1,2,3,4,5,6";
    const input = "3";

    const winnigLotto = new LottoWinning();
    winnigLotto.setWinningLotto(winningInput);

    expect(() => {
      winnigLotto.setBonusNumber(input);
    }).toThrow();
  });
});

describe("기능 테스트", () => {
  test("당첨로또와 겹치는 개수 계산한다.", () => {
    const lotto = [2, 3, 5, 6, 8, 9];
    const winnigLotto = [1, 2, 3, 4, 5, 6];
    const output = 4;

    const count = getMatchedinWinningNumberCount(lotto, winnigLotto);

    expect(count).toEqual(output);
  });

  test("로또가 보너스 번호를 가지고 있는지 확인 한다.", () => {
    const lotto = [2, 3, 5, 6, 8, 9];
    const bonusNumber = 6;

    const output = hasBounsNumber(lotto, bonusNumber);

    expect(output).toBeTruthy();
  });

  test("당첨함수의 수익률을 계산한다.", () => {
    const payment = 8000;
    const input = [
      {
        ranking: "FIFTH",
        reward: 5000,
        mathcedCount: 3,
        hasBounsNumber: false,
        amount: 1,
      },
      {
        ranking: "FOURTH",
        reward: 50000,
        mathcedCount: 4,
        hasBounsNumber: false,
        amount: 0,
      },
      {
        ranking: "THIRD",
        reward: 1500000,
        mathcedCount: 5,
        hasBounsNumber: false,
        amount: 0,
      },
      {
        ranking: "SECOND",
        reward: 30000000,
        mathcedCount: 5,
        hasBounsNumber: true,
        amount: 0,
      },
      {
        ranking: "FIRST",
        reward: 2000000000,
        mathcedCount: 6,
        hasBounsNumber: false,
        amount: 0,
      },
    ];
    const output = "62.5";

    const earningsRate = getEarningsRate(input, payment);

    expect(earningsRate).toEqual(output);
  });
});
