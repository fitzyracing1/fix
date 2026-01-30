# 🚀 FireCoin Exchange Deployment - Ready to Launch!

## Your Contract Details

```
Contract Address:  0x0e384B32353253A0303447D8F67cbcaA907B0628
Network:           Base Sepolia
Network RPC:       https://sepolia.base.org
Chain ID:          84532
Explorer:          https://sepolia.basescan.org
Web App:           https://firecoin-ass79fe7h-jshua-almeidas-projects.vercel.app
```

---

## Step 1: Verify Contract on BaseScan (2 minutes)

1. Go to: https://sepolia.basescan.org/address/0x0e384B32353253A0303447D8F67cbcaA907B0628
2. Click **"Contract"** tab
3. Click **"Verify and Publish"** button
4. Choose **Solidity (Standard-json-input)**
5. Upload your `build-info/982157a94857f22d9e993834ab6ccd8f.json` from `packages/contracts/artifacts/`
6. Click Verify

This makes your contract transparent and trusted!

---

## Step 2: Create Uniswap V3 Liquidity Pool (10 minutes)

### Prerequisites
- Your deployer wallet with some Base Sepolia ETH remaining (for gas)
- Some FCOIN tokens (already in your wallet from deployment!)
- ~0.01 Base Sepolia ETH (for liquidity + gas)

### Instructions

1. **Go to Uniswap V3**
   - Visit: https://app.uniswap.org/?chain=basesepolia

2. **Click "Add Liquidity"**

3. **Select Tokens**
   - Token A: Paste `0x0e384B32353253A0303447D8F67cbcaA907B0628` (FireCoin)
   - Token B: Select **ETH** (native)
   - Fee Tier: **0.30%** (standard for ERC20/ETH)

4. **Set Price Range**
   - Current price will calculate automatically based on your allocation
   - Example: If you have 1,000,000 FCOIN and 10 ETH
   - Price = 100,000 FCOIN per ETH
   - Set range: -10% to +10% around this price

5. **Approve Tokens**
   - Click "Approve FCOIN"
   - Sign in MetaMask
   - Wait for confirmation

6. **Add Liquidity**
   - Enter amounts: e.g., 1,000,000 FCOIN + 10 ETH
   - Click "Add" button
   - Sign transaction
   - Receive LP tokens (represents your liquidity share)

7. **Confirm**
   - Pool is now live! 🎉
   - Share the pool link on social media

---

## Step 3: Register Token on Tracking Sites (15 minutes)

### CoinGecko
1. Go to: https://www.coingecko.com/en/request-coin
2. Fill in:
   - Contract Address: `0x0e384B32353253A0303447D8F67cbcaA907B0628`
   - Network: Base (Sepolia testnet)
   - Symbol: FCOIN
   - Name: FireCoin
   - Website: `https://firecoin-ass79fe7h-jshua-almeidas-projects.vercel.app`
3. Submit

### CoinMarketCap
1. Go to: https://coinmarketcap.com/request/
2. Fill in similar info
3. Submit

### DeFiLlama
1. Go to: https://defillama.com/
2. Look for "Add Protocol" option
3. Submit your contract and pool info

---

## Step 4: Monitor Your Pool

### Key Metrics to Track
- **24h Volume**: How much FCOIN is being traded
- **Liquidity**: Total value locked in pool (should grow)
- **Price**: Market value of FCOIN
- **Slippage**: Transaction impact (lower is better)

### Useful Links
- **Pool Analytics**: https://info.uniswap.org/#/
- **Your Token**: https://sepolia.basescan.org/token/0x0e384B32353253A0303447D8F67cbcaA907B0628
- **All Pools**: https://app.uniswap.org/?chain=basesepolia

---

## Step 5: Marketing & Launch

### Announce Your Launch
1. Tweet about FireCoin going live
2. Share Uniswap pool link
3. Post on Discord/Reddit crypto communities
4. Highlight the mining feature (anyone can earn FCOIN!)

### Example Tweet
```
🔥 FireCoin is LIVE on Base Sepolia!

⛏️ Mine for FREE: https://firecoin-ass79fe7h-jshua-almeidas-projects.vercel.app
🌊 Trade on Uniswap: [Your Pool Link]
📊 Track Price: [CoinGecko Link]

Connect MetaMask to Base Sepolia and start mining FCOIN tokens!

#Web3 #Crypto #Mining #BaseChain
```

---

## Advanced: Multi-Chain Deployment

Once Base Sepolia is successful, expand to:

1. **Sepolia (Ethereum)**
   - Deploy: `pnpm hardhat run scripts/deploy.ts --network sepolia`
   - Create Uniswap pool on Sepolia
   
2. **Arbitrum Sepolia**
   - Add network to hardhat.config.ts
   - Deploy and create Camelot pool

3. **Polygon Mumbai**
   - Deploy and create QuickSwap pool

---

## Troubleshooting

### "Pool Won't Create"
- ✅ Check you have enough ETH for gas (~0.05 ETH)
- ✅ Verify tokens are on correct network
- ✅ Try with smaller amounts first

### "Contract Not Showing in Uniswap"
- ✅ Verify contract on BaseScan first
- ✅ Wait 5-10 minutes for Uniswap to index
- ✅ Try adding directly via contract address

### "High Slippage"
- ✅ Pool needs more liquidity
- ✅ Try smaller trade amounts
- ✅ Adjust price range on V3

### "Token Not in MetaMask"
- ✅ Click "Import Token" in MetaMask
- ✅ Paste contract address: `0x0e384B32353253A0303447D8F67cbcaA907B0628`
- ✅ Click "Add"

---

## Summary Checklist

- [ ] Verify contract on BaseScan
- [ ] Get more Base Sepolia ETH if needed (faucet)
- [ ] Create Uniswap V3 liquidity pool
- [ ] Register on CoinGecko
- [ ] Register on CoinMarketCap
- [ ] Register on DeFiLlama
- [ ] Announce launch on Twitter
- [ ] Monitor pool metrics
- [ ] Plan next chain expansion

---

**Contract:** 0x0e384B32353253A0303447D8F67cbcaA907B0628  
**Network:** Base Sepolia  
**Status:** ✅ Ready for Exchange Deployment  
**Last Updated:** January 23, 2026
