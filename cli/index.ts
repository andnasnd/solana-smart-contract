import web3 = require('@solana/web3.js');
import BN = require('bn.js');

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const programId = new web3.PublicKey("25uMF3J4Th8VWqHmna2XHfZzoy82SSdE7ANkqS8PRhEG");
const key: Uint8Array = Uint8Array.from([77,148,196,84,13,219,194,172,5,110,222,68,212,232,88,190,21,60,28,187,253,176,209,126,148,85,177,133,163,236,219,104,131,58,114,0,210,248,48,211,233,176,134,242,200,237,94,192,69,202,86,248,249,31,238,173,70,4,98,3,86,82,156,109]);

async function main() {
    const signer: web3.Keypair = web3.Keypair.fromSecretKey(key);

    const data: Buffer = Buffer.from(Uint8Array.of(0, ...new BN(134).toArray('le',8)));

    const txn = new web3.Transaction().add(
        new web3.TransactionInstruction({
            keys: [],
            programId,
            data,
        })
    );

    await web3
        .sendAndConfirmTransaction(connection, txn, [signer])
        .then((sig) => {
            console.log("sig: {}", sig);
        });

    /* GET BALANCE
    await connection.getBalance(signer.publicKey).then((balance) => {
        console.log("SOL: ", balance / web3.LAMPORTS_PER_SOL);
    });
    */
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
