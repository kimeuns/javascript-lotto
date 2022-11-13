const INPUT = Object.freeze({
  LOTTO_PAYMENT: "구입금액을 입력해 주세요.",
  WINNING_NUMBER: "당첨 번호를 입력해 주세요.",
  BONUS_NUMBER: "보너스 번호를 입력해 주세요.",
});

const ERROR = Object.freeze({
  PAYMENT_UNIT: "[ERROR] 1000원 단위만 입력 가능합니다.",
  PAYMENT_TYPE: "[ERROR] 숫자만 입력 가능합니다.",

  LOTTO_COUNT: "[ERROR] 로또는 6개의 숫자여야 합니다.",
  LOTTO_TYPE: "[ERROR] 로또 번호는 숫자여야 합니다.",
  LOTTO_RANGE: "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
  LOTTO_DUPLICATE: "[ERROR] 로또 번호는 중복되지 않는 숫자여야 합니다.",

  BONUS_COUNT: "[ERROR] 보너스 번호는 하나입니다.",
  BONUS_TYPE: "[ERROR] 보너스 번호는 숫자여야 합니다.",
  BONUS_RANGE: "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.",
  BONUS_DUPLICATE: "[ERROR] 보너스 번호는 로또 번호와 중복되지 않는 숫자여야 합니다.",
});

const LOTTO = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
});

module.exports = { INPUT, ERROR, LOTTO };