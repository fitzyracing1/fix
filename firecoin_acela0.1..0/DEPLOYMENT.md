# FireCoin Production Deployment Guide

## Current Status
✅ Smart contract working on localhost  
✅ Web app with mint/transfer/mine functions  
⏳ Ready for Sepolia testnet deployment  

## Steps to Make FireCoin a Real Mineable Cryptocurrency

### 1. Deploy Contract to Sepolia Testnet

**Prerequisites:**
- Get Sepolia ETH for gas (0.05+ ETH)
  - Faucets: https://www.alchemy.com/faucets/ethereum-sepolia
  - Or: https://sepoliafaucet.com
- Your deployer address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

**Deploy:**
```bash
cd packages/contracts
pnpm hardhat run scripts/deploy.ts --network sepolia
```

**Update .env after deployment:**
```
VITE_CONTRACT_ADDRESS=<deployed_address_from_above>
```

### 2. Switch to Production Frontend

**Replace current files with production versions:**
```bash
cd packages/web/src
cp App-production.tsx App.tsx
cp main-production.tsx main.tsx
```

**Update .env for Sepolia:**
```
VITE_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
VITE_CONTRACT_ADDRESS=<your_deployed_address>
VITE_WALLETCONNECT_PROJECT_ID=<optional_for_mobile_wallets>
```

### 3. Host Frontend Publicly

**Option A: Vercel (Recommended)**
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repo
4. Add environment variables in Vercel dashboard
5. Deploy - you'll get a public URL

**Option B: Netlify**
1. Build: `cd packages/web && pnpm build`
2. Deploy: `npx netlify deploy --prod --dir=dist`

### 4. Make It Minable by Anyone

**The contract is already minable!** Anyone can call the `mine()` function:
- Costs gas to execute
- Rewards miners with tokens
- Difficulty adjustable by owner

**Marketing FireCoin:**
- Share your deployed contract address
- Share your hosted web app URL
- Users connect MetaMask and mine
- Announce on Twitter/Discord/Reddit

### 5. Add Value (Optional but Recommended)

**Create Uniswap liquidity pool:**
1. Get some ETH on Sepolia
2. Go to https://app.uniswap.org
3. Add liquidity: FireCoin/ETH pair
4. This sets an exchange rate (value)

### Current Files

**Development (localhost with test accounts):**
- `src/App.tsx` - Current localhost version
- `src/main.tsx` - Anvil chain config

**Production (Sepolia with MetaMask):**
- `src/App-production.tsx` - Wallet connection version
- `src/main-production.tsx` - Sepolia chain config

## Quick Production Checklist

- [ ] Get Sepolia ETH for deployer address
- [ ] Deploy contract to Sepolia
- [ ] Update VITE_CONTRACT_ADDRESS in .env
- [ ] Switch to production files (cp App-production.tsx App.tsx)
- [ ] Test locally with MetaMask on Sepolia
- [ ] Push to GitHub
- [ ] Deploy to Vercel/Netlify
- [ ] Share public URL
- [ ] (Optional) Add Uniswap liquidity

## Network Info

**Sepolia Testnet:**
- Chain ID: 11155111
- RPC: https://rpc.sepolia.org
- Explorer: https://sepolia.etherscan.io
- Faucets: Free test ETH available

**Mainnet (when ready):**
- Chain ID: 1
- Requires real ETH for gas
- Deploy same way: `--network mainnet`

## Contract Functions (Public)

- `mine()` - Anyone can mine tokens (costs gas)
- `transfer(to, amount)` - Send tokens to others
- `mint(to, amount)` - Owner only (you control supply)
- `burn(amount)` - Burn your tokens
- `pause()/unpause()` - Owner emergency controls

## Next Steps After Deployment

1. Announce on social media
2. Create documentation/whitepaper
3. Set up community (Discord/Telegram)
4. Consider token distribution strategy
5. Add more features (staking, governance, etc.)

---

**Need help?** The contract is audited OpenZeppelin ERC20 code and ready for production!
