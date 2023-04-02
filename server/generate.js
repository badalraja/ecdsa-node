const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const getAddress = require("./address");
const signMessage = require("./sign-message");
const recoverKey = require("./recover-key");



async function main() {  
    const privateKey = secp.utils.randomPrivateKey();
    console.log('privateKey: ',toHex(privateKey))

    const publicKey = secp.getPublicKey(privateKey);
    console.log('publicKey: ',toHex(publicKey))

    const address = getAddress(publicKey)
    console.log('address: ',toHex(address))

    const [sig, recoveryBit] = await signMessage(toHex(address), privateKey);
    const signature = toHex(sig)
    console.log('sig: ',sig);
    console.log('sig: ',toHex(sig));
    console.log('recoveryBit: ',recoveryBit);

    const recovered = await recoverKey(toHex(address), new Uint8Array(Buffer.from(signature, 'hex')), recoveryBit);
    console.log('recovered: ',toHex(recovered));
}

main()



