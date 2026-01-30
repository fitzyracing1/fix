# 🔄 FireCoin Exchange Deployment Guide

Deploy FireCoin to DEXes (Decentralized Exchanges) to enable trading and provide liquidity.

## Prerequisites
- ✅ Contract deployed to Sepolia or Base Sepolia
- ✅ Some FCOIN tokens (for initial liquidity)
- ✅ ETH on the same network (for gas and liquidity pool)
- ✅ MetaMask or similar wallet connected

---

## 1. Uniswap V3 (Primary DEX)

### Deploy Liquidity Pool on Uniswap

**Network:** Sepolia or Base Sepolia  
**Fee Tier Options:**
- 0.01% - Stablecoin pairs
- 0.05% - Stablecoin pairs  
- 0.30% - Standard pairs (recommended for FCOIN/ETH)
- 1.00% - Exotic pairs

### Step-by-Step:

1. **Go to Uniswap V3 Interface**
   - Sepolia: https://app.uniswap.org/?chain=sepolia
   - Base Sepolia: https://app.uniswap.org/?chain=basesepolia

2. **Click "Add Liquidity"**

3. **Select Token Pair**
   - Token A: FCOIN (paste contract address)
   - Token B: ETH (native)
   - Fee: 0.30% (standard)

4. **Set Price Range**
   - Current market price: Calculate based on your allocation
   - Example: 1 ETH = 1000 FCOIN
   - Set range: -10% to +10% around current price

5. **Approve Tokens**
   - Click "Approve FCOIN"
   - Sign transaction
   - Wait for confirmation

6. **Create Pool**
   - Amount of FCOIN: e.g., 100,000
   - Amount of ETH: e.g., 100
   - Click "Add" button
   - Sign transaction

7. **Confirm**
   - You'll receive LP tokens representing your liquidity share
   - Pool is now live on Uniswap!

---

## 2. SushiSwap (Alternative DEX)

### Deploy on SushiSwap

**Networks:** Sepolia, Base Sepolia  
**Link:** https://www.sushi.com/swap

1. Click "Create Pool" or "Liquidity"
2. Select FCOIN and ETH
3. Set exchange rate
4. Approve and deposit liquidity
5. Receive SLP tokens (SushiSwap LP tokens)

---

## 3. Pancakeswap (For BSC networks)

If deploying to **Binance Smart Chain**:

1. Go to https://pancakeswap.finance/swap
2. Create FCOIN/BUSD or FCOIN/ETH pool
3. Deposit equal value liquidity
4. Receive CAKE LP tokens

---

## 4. Uniswap V2 (Alternative / Backup)

If V3 is not available on your network:

1. Go to https://app.uniswap.org/add/ETH
2. Paste FCOIN contract address
3. Set amounts
4. Click "Supply"
5. Receive UNI-V2 LP tokens

---

## FireCoin Token Information

```
Token Name:     FireCoin
Token Symbol:   FCOIN
Network:        Sepolia / Base Sepolia
Type:           ERC20 (Mineable)
Decimals:       18

Mining:
- Anyone can call mine() function
- Earns FCOIN tokens per block
- Difficulty adjustable

Features:
- Pausable transfers
- Capped supply
- Burnable tokens
- Owner-controlled parameters
```

---

## Liquidity Pool Strategy

### Initial Liquidity
- **Recommended allocation:** 10% of total supply
- **Example:** If cap is 1,000,000 FCOIN, provide 100,000 FCOIN + equivalent ETH

### Price Discovery
- Set initial price based on your valuation
- Market will adjust via arbitrage
- Formula: (Amount of FCOIN) / (Amount of ETH) = Exchange Rate

### Incentivizing Liquidity
- Mining rewards can be directed to liquidity providers
- Consider reward programs for LP token holders
- Announce launches on Twitter/Discord

---

## Post-Launch Tasks

### Register Token on Tracking Sites
1. **CoinGecko** - https://www.coingecko.com/en/request-coin
2. **CoinMarketCap** - https://coinmarketcap.com/request/
3. **DeFiLlama** - Add protocol information

### Get Verified Badge
- Add token logo to `public/logos/fcoin.png`
- Submit to Uniswap Token Lists
- Get MetaMask token verification

### Marketing
- Tweet deployment announcement
- Share pool link
- Encourage mining and trading
- Post on Ethereum / Crypto forums

---

## Monitor Your Pool

### Useful Links
- **Sepolia Explorer:** https://sepolia.etherscan.io/token/YOUR_CONTRACT_ADDRESS
- **Base Sepolia Explorer:** https://sepolia.basescan.org/token/YOUR_CONTRACT_ADDRESS
- **Uniswap Analytics:** https://info.uniswap.org/#/

### Track Metrics
- Total liquidity ($)
- 24h volume
- Fee rewards earned
- Price charts

---

## Advanced: Multi-Chain Deployment

### Deploy to Multiple Chains
1. **Sepolia** (Ethereum testnet)
2. **Base Sepolia** (Base testnet)
3. **Arbitrum Sepolia** (Arbitrum testnet)
4. **Polygon Mumbai** (Polygon testnet)

**Benefits:**
- Higher total liquidity across chains
- Cross-chain arbitrage opportunities
- Reach more users

**Tools:**
- Across Protocol - Cross-chain bridge
- Stargate - Cross-chain liquidity
- CCIP - Chainlink Cross-Chain Messaging

---

## Troubleshooting

### Pool Won't Create
- ❌ Insufficient balance - Get more FCOIN or ETH
- ❌ Wrong network - Check MetaMask network selection
- ❌ Contract not verified - Verify on block explorer first

### High Slippage
- Token has low liquidity - Add more liquidity
- Price impact too high - Split into smaller trades
- Wrong price range on V3 - Adjust range settings

### Missing Token in Wallet
- Add token manually with contract address
- Token doesn't appear? Verify contract is correctly deployed

---

## Next Steps

1. ✅ Deploy contract to testnet
2. ✅ Create Uniswap liquidity pool
3. ✅ Get verified on block explorer
4. ✅ Register on CoinGecko/CMC
5. ✅ Launch on mainnet (when ready)
6. ✅ Expand to additional DEXes
7. ✅ List on CEXes (centralized exchanges)
