# 🚀 Deploy FireCoin to Base Sepolia (FREE!)

## Why Base Sepolia?
✅ **FREE testnet ETH** - No mainnet ETH required  
✅ Coinbase-backed L2 network  
✅ Low gas fees  
✅ Public explorer (BaseScan)  
✅ Production-ready infrastructure  

---

## Step 1: Get FREE Base Sepolia ETH

**Deployer Address:** `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

**Get testnet ETH from Base Sepolia Faucet:**
1. Go to: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
2. Paste address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
3. Complete captcha
4. Get 0.1 Base Sepolia ETH (plenty for deployment!)

**Alternative faucets:**
- https://faucet.quicknode.com/base/sepolia
- https://www.alchemy.com/faucets/base-sepolia

**Check balance:**
- Explorer: https://sepolia.basescan.org/address/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

---

## Step 2: Deploy FireCoin to Base Sepolia

Once you have Base Sepolia ETH:

```bash
cd /Users/joshuafitzgerald/firecoin/packages/contracts
pnpm hardhat run scripts/deploy.ts --network baseSepolia
```

**Expected output:**
```
Deploying with: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
FireCoin deployed to: 0x...
```

---

## Step 3: Update Frontend for Base Sepolia

**Copy the deployed contract address, then:**

```bash
# Update .env with deployed address
echo "VITE_CONTRACT_ADDRESS=0xYOUR_DEPLOYED_ADDRESS" >> /Users/joshuafitzgerald/firecoin/.env

# Switch to Base Sepolia frontend
cd /Users/joshuafitzgerald/firecoin/packages/web/src
cp App-production.tsx App.tsx
cp main-base.tsx main.tsx
```

---

## Step 4: Test Locally

```bash
cd /Users/joshuafitzgerald/firecoin/packages/web
pnpm dev
```

Open http://localhost:5173 and:
1. Connect MetaMask
2. Switch to Base Sepolia network in MetaMask
3. Test mining, transfers, minting

---

## Step 5: Deploy to Vercel (Public Access)

**Make FireCoin accessible worldwide:**

1. Push to GitHub:
```bash
cd /Users/joshuafitzgerald/firecoin
git init
git add .
git commit -m "FireCoin - Mineable ERC20 on Base Sepolia"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Deploy on Vercel:
   - Go to https://vercel.com
   - Sign in with GitHub
   - Import your firecoin repository
   - Set root directory: `packages/web`
   - Add environment variables:
     - `VITE_BASE_SEPOLIA_RPC_URL` = `https://sepolia.base.org`
     - `VITE_CONTRACT_ADDRESS` = Your deployed address
   - Deploy!

3. Get your public URL (e.g., `firecoin.vercel.app`)

---

## Base Sepolia Network Info

- **Chain ID:** 84532
- **RPC URL:** https://sepolia.base.org
- **Explorer:** https://sepolia.basescan.org
- **Faucet:** https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **Currency:** ETH (testnet)
- **Gas:** Very low (~$0.001 per transaction on testnet)

---

## Add Base Sepolia to MetaMask

**Manual setup:**
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Enter:
   - Network Name: Base Sepolia
   - RPC URL: https://sepolia.base.org
   - Chain ID: 84532
   - Currency Symbol: ETH
   - Block Explorer: https://sepolia.basescan.org

**Or click:** https://chainlist.org/chain/84532

---

## What Users Can Do

Once deployed and hosted:
1. **Mine FireCoin** - Anyone can call `mine()` to get tokens
2. **Transfer** - Send FireCoin to other addresses
3. **Trade** - Later add to Uniswap for value

---

## Verify Contract on BaseScan

After deployment:
```bash
cd /Users/joshuafitzgerald/firecoin/packages/contracts
pnpm hardhat verify --network baseSepolia YOUR_DEPLOYED_ADDRESS \
  "1000000000000000000000000" \
  "100000000000000000000000000" \
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" \
  "10000000000000000000" \
  "1000"
```

This makes your contract code visible on BaseScan.

---

## Next Steps After Deployment

1. ✅ Share your Vercel URL
2. ✅ Announce on Twitter/Discord/Reddit
3. ✅ Let users mine and transfer
4. ✅ Build community
5. ✅ Consider moving to Base mainnet (real value!)

---

## Troubleshooting

**"Insufficient funds" error?**
- Check balance: https://sepolia.basescan.org/address/YOUR_ADDRESS
- Get more from faucet

**MetaMask not connecting?**
- Add Base Sepolia network to MetaMask
- Switch to Base Sepolia network
- Refresh page

**Transaction failing?**
- Increase gas limit in MetaMask
- Check you're on Base Sepolia network
- Verify contract address is correct

---

**Ready to deploy!** Once you get Base Sepolia ETH from the faucet, run the deploy command and FireCoin will be live! 🔥
