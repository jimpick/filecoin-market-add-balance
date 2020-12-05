require('regenerator-runtime/runtime')
const {
  HttpJsonRpcConnector,
  LotusWalletProvider,
  LotusClient
} = require('filecoin.js')
const { FilecoinNumber } = require('@glif/filecoin-number')
const { newFromString } = require('@glif/filecoin-address')
require('dotenv').config()

async function run () {
  const connector = new HttpJsonRpcConnector({
    url: process.env.URL,
    token: process.env.TOKEN
  })
  const client = new LotusClient(connector)
  const wallet = new LotusWalletProvider(client)

  const version = await client.common.version()
  console.log('Version:', version)

  const defaultWallet = await wallet.getDefaultAddress()
  console.log('Default wallet:', defaultWallet)

  const defaultWalletId = await client.state.lookupId(defaultWallet)
  console.log('Default wallet ID:', defaultWalletId)

  const balanceBefore = new FilecoinNumber(
    await client.wallet.balance(defaultWallet),
    'attofil'
  )
  console.log('Wallet balance:', balanceBefore.toFil())

  const marketBalanceBefore = await client.state.marketBalance(defaultWallet)
  const escrowBefore = new FilecoinNumber(marketBalanceBefore.Escrow, 'attofil')
  const lockedBefore = new FilecoinNumber(marketBalanceBefore.Locked, 'attofil')
  console.log('Market balance (Escrow):', escrowBefore.toFil())
  console.log('Market balance (Locked):', lockedBefore.toFil())

  if (process.argv.length > 2) {
    const amount = new FilecoinNumber(process.argv[2], 'fil')
    console.log(`Transferring ${amount.toFil()} FIL to market balance`)

    const paramBuffer = Buffer.concat([
        Buffer.from([0x58, 0x31]), // What is this prefix?
        Buffer.from(newFromString(defaultWallet).str)
      ])
    // console.log('Jim', paramBuffer.toString('base64'))

    const message = await wallet.createMessage({
      From: defaultWallet,
      To: 'f05',
      Value: amount.toAttoFil(),
      Method: 2, // AddBalance
      Params: paramBuffer.toString('base64') // Necessary?
    })
    // console.log('Raw Message:', message)
    const signedMessage = await wallet.signMessage(message)
    console.log('Signed Message:', signedMessage)
    const msg = await wallet.sendSignedMessage(signedMessage)
    console.log('Msg:', msg)
  }
}

run()
