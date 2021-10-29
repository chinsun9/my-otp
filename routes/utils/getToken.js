const crypto = require('crypto');

function getToken(K, isMinus1 = false) {
  const ts = 30; // 30초 간격으로 토큰을 생성할 것
  const N = Math.floor(new Date().getTime() / (ts * 1000)) + (isMinus1 ? -1 : 0);

  const nHex = N.toString(16).padStart(16, '0'); // 16자리가 되도록 앞에 0 패딩추가

  const m = Buffer.from(`0x${nHex}`);

  console.log({ K, m });

  const hmacHash = crypto.createHmac('sha1', K).update(m).digest('hex');

  // OTP 생성
  const offset = Number(`0x${hmacHash[hmacHash.length - 1]}`);

  // offset으로부터 4개 바이트 변환
  const tokenHex4bytes = hmacHash.substring(offset * 2, offset * 2 + 4 * 2);
  let toeknHex = (Number(`0x${tokenHex4bytes.substring(0, 2)}`) & 0x7f).toString(16).padStart(2, '0');

  for (let index = 2; index < tokenHex4bytes.length; index += 2) {
    const element = tokenHex4bytes.substring(index, index + 2);
    toeknHex += (Number(`0x${element}`) & 0xff).toString(16).padStart(2, '0');
  }

  const token = Number(`0x${toeknHex}`).toString().substr(-6);
  console.log({ token });
  return token;
}

module.exports.getToken = getToken;
