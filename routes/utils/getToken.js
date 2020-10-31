const crypto = require('crypto');

function getToken(K, isMinus1 = false) {
  const ts = 30; // 30초 간격으로 토큰을 생성할 것
  let N = Math.floor(new Date().getTime() / (ts * 1000)) + (isMinus1 ? -1 : 0);

  let N_hex = ('000000000000000' + N.toString(16)).substr(-16); // 16자리가 되도록 앞에 0 패딩추가

  // let m = hexToBytes(N_hex);
  // console.log(m);

  let m = Buffer.from(`0x${N_hex}`);
  console.log(m);

  console.log(`K : ${K}`);
  console.log(`m : ${m}`);

  let hmac_hash = crypto.createHmac('sha1', K).update(m).digest('hex');
  // console.log(hmac_hash, hmac_hash.length);

  // OTP 생성
  const offset = parseInt(Number(`0x${hmac_hash[hmac_hash.length - 1]}`), 10);

  // offset으로부터 4개 바이트 변환
  const token_hex_4bytes = hmac_hash.substring(offset * 2, offset * 2 + 4 * 2);
  let toekn_hex = '';

  toekn_hex += (
    '00' + (Number(`0x${token_hex_4bytes.substring(0, 2)}`) & 0x7f).toString(16)
  ).substr(-2);

  for (let index = 2; index < token_hex_4bytes.length; index += 2) {
    const element = token_hex_4bytes.substring(index, index + 2);
    toekn_hex += ('00' + (Number(`0x${element}`) & 0xff).toString(16)).substr(
      -2
    );
  }

  const token = Number(`0x${toekn_hex}`).toString().substr(-6);
  console.log(`token : ${token}`);
  return token;
}

module.exports.getToken = getToken;
