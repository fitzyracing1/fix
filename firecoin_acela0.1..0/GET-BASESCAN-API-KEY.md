# 🔑 Get BaseScan API Key for Automatic Verification

## Step 1: Get Your Free API Key

1. Go to: https://basescan.org/apis
2. Click "Create an Account" (if needed)
3. Verify your email
4. Go back to https://basescan.org/apis
5. Click "Create New Key"
6. Name it: `FireCoin`
7. Copy your API Key (looks like: `ABCD1234EFGH5678IJKL9012MNOP3456`)

## Step 2: Add to .env

Add this line to `/Users/joshuafitzgerald/firecoin_acela0.1..0/.env`:

```
BASESCAN_API_KEY=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with the key you copied.

## Step 3: Run Verification

Then run:
```bash
cd packages/contracts
pnpm hardhat verify --network baseSepolia 0x0e384B32353253A0303447D8F67cbcaA907B0628 1000000000000000000000000 100000000000000000000000000 0xfc8Cda82664CB33a58bDdE103bAD515FB8E323F5 10000000000000000000 1000
```

---

## Alternative: Manual Verification (No API Key Needed)

If you don't want to get an API key, you can **manually verify** on BaseScan:

1. Go to: https://sepolia.basescan.org/address/0x0e384B32353253A0303447D8F67cbcaA907B0628
2. Click "Contract" tab
3. Click "Verify and Publish"
4. Fill in form with these settings:
   - **Compiler Type:** Solidity (Single file)
   - **Compiler Version:** v0.8.24
   - **License:** MIT
   - **Code:** Paste flattened code from `packages/contracts/FireCoin.flattened.sol`
   - **Constructor Args:** Leave blank
5. Click "Verify and Publish"

---

## Option 1 (Recommended): Get API Key & Auto-Verify

**Faster and more reliable.** Takes 2 minutes to get the API key.

## Option 2 (Manual): No API Key Needed

**Slower but works without API key.** Just follow the alternative steps above.

---

Let me know which option you choose! I'll help complete the verification. 🚀
