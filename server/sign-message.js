const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hash-message');


async function signMessage(msg, privateKey) {
    const messageHash = hashMessage(msg)
    return await secp.sign(messageHash, privateKey, { recovered: true });
}

module.exports = signMessage;