const base32 = require('base32');

function genSharedKey() {
  const random12 = `${Math.random() * Math.pow(10, 20)}`.substring(0, 12);

  return (K = base32.encode(random12));
}

module.exports.genSharedKey = genSharedKey;
