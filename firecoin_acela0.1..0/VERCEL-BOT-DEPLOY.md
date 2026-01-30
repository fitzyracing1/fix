# Deploy FireCoin Bots to Vercel

## 🚀 Quick Deploy

### 1. Push to GitHub

```bash
cd /Users/joshuafitzgerald/firecoin_acela0.1..0
git add .
git commit -m "Add FireCoin bot API system"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory:** `packages/web`
   - **Framework Preset:** Vite
   - **Build Command:** `pnpm vite build`
   - **Output Directory:** `dist`

5. Add Environment Variables:
   ```
   VITE_CONTRACT_ADDRESS=0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D
   BOT_PAYMENT_ADDRESS=0x2BA57aF7B4055E26c4ad1E840e2078E8E9bCce8A
   BASE_RPC_URL=https://mainnet.base.org
   ```

6. Click "Deploy"

## 🤖 Bot API Endpoints

Once deployed, your bots will be available at:

### Mine FireCoin
**POST** `https://your-app.vercel.app/api/mine`
```json
{
  "botWalletKey": "YOUR_BOT_PRIVATE_KEY",
  "attempts": 10
}
```

### Pay Another Bot (10% fee to you)
**POST** `https://your-app.vercel.app/api/pay`
```json
{
  "botWalletKey": "YOUR_BOT_PRIVATE_KEY",
  "recipientAddress": "0x...",
  "amount": "100",
  "service": "AI text generation"
}
```

### Check Bot Status
**GET** `https://your-app.vercel.app/api/status?address=0x...`

## 📊 Bot Dashboard

View at: `https://your-app.vercel.app/bot-dashboard.html`

## ⏰ Automated Mining (Optional)

Enable Vercel Cron to mine automatically:

1. Rename `vercel-cron.json` to `vercel.json` (merge with existing)
2. Add bot private key as environment variable
3. Redeploy

## 🔐 Security Notes

- **NEVER** commit private keys
- Store bot keys in Vercel environment variables
- Use separate wallets for bots
- Monitor bot balances regularly

## 💡 Example: Create a Mining Bot

```javascript
// Auto-mine every 10 minutes
setInterval(async () => {
  const response = await fetch('https://your-app.vercel.app/api/mine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      botWalletKey: process.env.BOT_PRIVATE_KEY,
      attempts: 5
    })
  });
  const result = await response.json();
  console.log('Mining result:', result);
}, 10 * 60 * 1000);
```

## 💰 Revenue Model

Every bot payment automatically sends **10% to your wallet** (`0xfc8Cda82...FB8E323F5`):

- Bot A pays Bot B: 1,000 FCOIN
- Bot B receives: 900 FCOIN
- You receive: **100 FCOIN** (10% fee)

All fees go directly to your wallet automatically!

## 📈 Scale Your Bot Network

1. **Deploy bots** - Create multiple bot wallets
2. **Register them** - Call `registerBot()` on BotPayment contract
3. **Fund bots** - Send them FCOIN
4. **Let them trade** - Bots pay each other, you earn 10% on all payments
5. **Watch revenue grow** - More bot activity = more fees

## 🛠 Troubleshooting

**Q: Bots not mining?**
- Check bot has ETH for gas
- Verify difficulty setting (lower = easier)

**Q: Payments failing?**
- Ensure bot is registered: `registerBot(botAddress)`
- Check bot has enough FCOIN balance
- Verify approval was granted

**Q: Fee not received?**
- Check feeCollector address matches your wallet
- Verify on BaseScan transaction logs

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test API endpoints
3. ✅ Register bot wallets
4. ✅ Start mining/earning fees
5. 🚀 Scale bot network
