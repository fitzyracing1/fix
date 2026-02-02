# FireCoin - Import to Uniswap

## Quick Import

### Method 1: Direct URL
1. Go to [Uniswap](https://app.uniswap.org)
2. Click **"Manage Token Lists"**
3. Paste this URL:
   ```
   https://firecoin.vercel.app/firecoin-tokenlist.json
   ```
4. Click **"Import"**

### Method 2: Manual Token Import
1. Go to [Uniswap](https://app.uniswap.org)
2. Click **"Select a token"**
3. Paste contract address:
   ```
   0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D
   ```
4. Click **"Import"**
5. Accept the warning

### Method 3: Direct Trade Link
Share this link with users:
```
https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D&chain=base
```

## Token Details
- **Name:** FireCoin
- **Symbol:** FCOIN
- **Network:** Base Mainnet (Chain ID: 8453)
- **Contract:** `0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D`
- **Decimals:** 18

## For Developers
Add to your token list:
```json
{
  "chainId": 8453,
  "address": "0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D",
  "name": "FireCoin",
  "symbol": "FCOIN",
  "decimals": 18,
  "logoURI": "https://firecoin.vercel.app/logo.png"
}
```
