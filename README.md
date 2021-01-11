# filecoin-market-add-balance
Use Filecoin.js to transfer funds from default wallet to market balance

## Requirement 
NodeJS version > 10

Create a .env file

```
URL=http://localhost:1234/rpc/v0
TOKEN=<your token>
```

## Intallation

```
npm install 
```

## How to Use
List current balance:
```
$node index.js

Default wallet: f3ufzpudvsjqyiholpxiqoomsd2svy26jvy4z4pzodikgovkhkp6ioxf5p4jbpnf7tgyg67dny4j75e7og7zeq
Default wallet ID: f033132
Wallet balance: 17.938548588589959057
Market balance (Escrow): 23.964204437171373785
Market balance (Locked): 23.620773989216783145
```
Transfer balance to market

```
$ node index.js 0.1

Version: { Version: '1.2.1+git.df66f48f6', APIVersion: 65536, BlockDelay: 30 }
Default wallet: f3ufzpudvsjqyiholpxiqoomsd2svy26jvy4z4pzodikgovkhkp6ioxf5p4jbpnf7tgyg67dny4j75e7og7zeq
Default wallet ID: f033132
Wallet balance: 17.938548588589959057
Market balance (Escrow): 23.964171605171373785
Market balance (Locked): 23.620741157216783145
Transferring 0.1 FIL to market balance
Signed Message: {
  Message: {
    Version: 0,
    To: 'f05',
    From: 'f3ufzpudvsjqyiholpxiqoomsd2svy26jvy4z4pzodikgovkhkp6ioxf5p4jbpnf7tgyg67dny4j75e7og7zeq',
    Nonce: 11664,
    Value: '100000000000000000',
    GasLimit: 9727558,
    GasFeeCap: '3084021',
    GasPremium: '100576',
    Method: 2,
    Params: 'WDEDoXL6DrJMMIO5b7og5zJD1KuNeTXHM8flw0KM6qjqf5Drl6/iQvaX8zYN74244n/S',
    CID: {
      '/': 'bafy2bzacebtcwbrsbaqwe3ivjntfpevg4wcngebqdrqlk72l3xouvc5aydyai'
    }
  },
  Signature: {
    Type: 2,
    Data: 'pKshWCktDAhKz8QeUnmKOQOclWtQ2fYxAwuG9SumRTR6HiB8YJ1XxJT/GwX3xaUUGaGsIKl8IwjX3pP0K5LjXRgUZ5GqvfzwJ2409ue/xAf1PxPkbvYG89/Av+9PtmFv'
  },
  CID: {
    '/': 'bafy2bzacebtcwbrsbaqwe3ivjntfpevg4wcngebqdrqlk72l3xouvc5aydyai'
  }
}
Msg: {
  '/': 'bafy2bzacebtcwbrsbaqwe3ivjntfpevg4wcngebqdrqlk72l3xouvc5aydyai'
}
```
