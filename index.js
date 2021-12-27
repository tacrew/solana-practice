const {Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL} = require('@solana/web3.js')

const newPair = new Keypair()

const publicKey = new PublicKey(newPair.publicKey).toString()

const secretKey = newPair.secretKey

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const myWallet = Keypair.fromSecretKey(secretKey)
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey))
        console.log(`Wallet Address: ${publicKey}`)
        console.log(`Wallet Balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL} SOL`)
    } catch (err) {
        console.log(err)
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const myWallet = Keypair.fromSecretKey(secretKey)
        console.log('-- Airdropping 2 SOL --')
        const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(myWallet.publicKey), 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSignature)
    } catch(err) {
        console.log(err)
    }
}

const driverFunction = async () => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}

driverFunction()