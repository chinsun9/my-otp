const base32 = require('base32');
const { randomBytes } = require('crypto')

function genSharedKey() {
  const random12 = randomBytes(12 / 2).toString('hex');

  return base32.encode(random12);
}

module.exports.genSharedKey = genSharedKey;
