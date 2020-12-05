import { HttpJsonRpcConnector, LotusClient } from 'filecoin.js'
import { FilecoinNumber } from '@glif/filecoin-number'
import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

async function run () {
  const url = process.env.ENDPOINT // 'https://lotus.jimpick.com/spacerace_api/1/node/rpc/v0'
  const token = process.env.TOKEN
  const httpConnector = new HttpJsonRpcConnector({
    url: process.env.URL,
    token: process.env.TOKEN
  })

  const client = new LotusClient(httpConnector)
  const version = await client.common.version()
  console.log('Version:', version)

  const defaultWallet = await client.wallet.getDefaultAddress()
  console.log('Default wallet:', defaultWallet)

  const balanceBefore = new FilecoinNumber(
    await client.wallet.balance(defaultWallet),
    'attofil'
  )
  console.log('Wallet balance:', balanceBefore.toFil())
}

run()
