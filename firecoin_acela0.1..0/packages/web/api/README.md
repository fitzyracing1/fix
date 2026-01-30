# FireCoin Bot API

Automated bots deployed on Vercel for FireCoin mining and payments.

## API Endpoints

### 1. Mine FireCoin
**POST** `/api/mine`

Attempts to mine FireCoin blocks.

```json
{
  "botWalletKey": "0x...",
  "attempts": 5
}
```

**Response:**
```json
{
  "success": true,
  "botAddress": "0x...",
  "miningAttempts": 5,
  "successfulMines": 1,
  "newBalance": "150.0",
  "results": [...]
}
```

### 2. Pay Another Bot
**POST** `/api/pay`

Send FireCoin payment with automatic 10% fee to owner.

```json
{
  "botWalletKey": "0x...",
  "recipientAddress": "0x...",
  "amount": "100",
  "service": "AI text generation"
}
```

**Response:**
```json
{
  "success": true,
  "botAddress": "0x...",
  "recipient": "0x...",
  "amount": "100",
  "fee": "10 FCOIN (10%)",
  "recipientReceived": "90 FCOIN",
  "txHash": "0x...",
  "newBalance": "50.0"
}
```

### 3. Check Bot Status
**GET** `/api/status?address=0x...`

Check bot balances and registration status.

**Response:**
```json
{
  "botAddress": "0x...",
  "tokenBalance": "150.0",
  "depositBalance": "50.0",
  "isRegistered": true,
  "contracts": {
    "fireCoin": "0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D",
    "botPayment": "0x2BA57aF7B4055E26c4ad1E840e2078E8E9bCce8A"
  }
}
```

## Environment Variables

Add to Vercel:

```env
VITE_CONTRACT_ADDRESS=0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D
BOT_PAYMENT_ADDRESS=0x2BA57aF7B4055E26c4ad1E840e2078E8E9bCce8A
BASE_RPC_URL=https://mainnet.base.org
```

## Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## Example Usage

```javascript
// Mine FireCoin
const response = await fetch('https://your-app.vercel.app/api/mine', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    botWalletKey: 'YOUR_BOT_PRIVATE_KEY',
    attempts: 10
  })
});

// Pay another bot
const payment = await fetch('https://your-app.vercel.app/api/pay', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    botWalletKey: 'YOUR_BOT_PRIVATE_KEY',
    recipientAddress: '0x...',
    amount: '100',
    service: 'AI Service'
  })
});

// Check status
const status = await fetch('https://your-app.vercel.app/api/status?address=0x...');
```

## Automated Mining

Set up a cron job or use Vercel Cron to mine automatically:

```javascript
// vercel.json
{
  "crons": [{
    "path": "/api/mine",
    "schedule": "*/5 * * * *"  // Every 5 minutes
  }]
}
```
