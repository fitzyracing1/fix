# 💧 Get Base Sepolia Test ETH

Your deployer address has no funds: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

## Quick Faucet Links

Use **one** of these to get free Base Sepolia ETH:

### Option 1: Coinbase Faucet (Recommended)
https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

1. Open link above
2. Paste address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
3. Complete CAPTCHA
4. Get 0.1 Base Sepolia ETH (enough for deployment!)

### Option 2: QuickNode Faucet
https://faucet.quicknode.com/base/sepolia

1. Open link above
2. Enter address
3. Click "Send me ETH"

### Option 3: Alchemy Faucet
https://www.alchemy.com/faucets/base-sepolia

1. Open link above
2. Sign in / Create account
3. Enter address
4. Receive ETH

---

## Verify Balance

After claiming, check your balance:
https://sepolia.basescan.org/address/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

---

## Deploy After Getting ETH

Once you have Base Sepolia ETH, run:

```bash
cd /Users/joshuafitzgerald/firecoin_acela0.1..0/packages/contracts
pnpm hardhat run scripts/deploy.ts --network baseSepolia
```

You'll see:
```
Deploying with: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
FireCoin deployed to: 0x...
```

---

## Next: Update Contract Address

After deployment, update your web app:

```bash
# Copy the deployed address from above
echo "VITE_CONTRACT_ADDRESS=0x..." >> /Users/joshuafitzgerald/firecoin_acela0.1..0/.env

# Redeploy web app
cd /Users/joshuafitzgerald/firecoin_acela0.1..0/packages/web
pnpm build && npx vercel deploy --prod --yes
```

---

**You need ~0.01 Base Sepolia ETH for deployment gas** ✅
