# 🔍 BaseScan Contract Verification Guide

## Verifying FireCoin on Base Sepolia

Your contract is at: `0x0e384B32353253A0303447D8F67cbcaA907B0628`

### Compiler Type Options

When BaseScan asks for "Compiler Type", choose one:

1. **✅ RECOMMENDED: Single File (Solidity)**
   - Simplest method
   - Copy-paste your contract code

2. **Standard JSON Input**
   - More complex
   - For multi-file contracts
   - Use the build-info JSON

3. **Multi-File**
   - For contracts with imports
   - Upload multiple .sol files

---

## Method 1: Single File Verification (Easiest)

### Step-by-Step

1. Go to: https://sepolia.basescan.org/address/0x0e384B32353253A0303447D8F67cbcaA907B0628

2. Scroll down and click **"Contract"** tab

3. Click **"Verify and Publish"** button

4. **Compiler Type**: Select **"Solidity (Single file)"**

5. **Compiler Version**: Select **`v0.8.24+commit.e64d63b7`**

6. **License**: Select **"MIT"**

7. **Contract Code**: 
   - Copy your contract code from: `packages/contracts/contracts/FireCoin.sol`
   - Paste into the code box

8. **Constructor Arguments** (ABI-encoded):
   - Leave empty or follow the encoding below

9. Click **"Verify and Publish"**

---

## Constructor Arguments (If Needed)

Your contract was deployed with these parameters:
```
initialSupply: 1,000,000 FCOIN (1000000000000000000000000 in wei)
cap: 100,000,000 FCOIN (100000000000000000000000000 in wei)
owner: 0xfc8Cda82664CB33a58bDdE103bAD515FB8E323F5
rewardPerBlock: 10 FCOIN (10000000000000000000 in wei)
difficulty: 1000
```

**ABI-encoded (for verification):**
```
0x000000000000000000000000000000000000000000000000d3c21bcecceda1000000000000000000000000000000000000000000000000152d02c7e14af6800000000000000000000000000000fc8cda82664cb33a58bdde103bad515fb8e323f50000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000000000000000003e8
```

---

## Method 2: Standard JSON Input (Alternative)

If "Single File" doesn't work:

1. Select **"Solidity (Standard-json-input)"** from dropdown

2. Upload this file:
   - Location: `packages/contracts/artifacts/build-info/982157a94857f22d9e993834ab6ccd8f.json`

3. Click **"Verify and Publish"**

---

## Troubleshooting

### "Contract verification failed"

**Problem:** Compiler version mismatch
- **Solution:** Make sure you select **v0.8.24** (not 0.8.23 or 0.8.25)

**Problem:** Code doesn't match bytecode
- **Solution:** Copy the EXACT code from your repository
- Don't modify comments or whitespace

**Problem:** "License not found"
- **Solution:** The code has `SPDX-License-Identifier: MIT` at the top - select "MIT"

### "Constructor arguments don't match"

**Solution:** Leave the Constructor Arguments field empty if you're not sure. BaseScan should auto-detect them.

---

## After Verification

Once verified (✅ green checkmark):

1. ✅ Your contract code is publicly readable
2. ✅ People can see all functions and variables
3. ✅ Uniswap will recognize and show the contract
4. ✅ Better trust for your token

---

## Quick Verification Summary

| Field | Value |
|-------|-------|
| Contract Address | `0x0e384B32353253A0303447D8F67cbcaA907B0628` |
| Network | Base Sepolia |
| Compiler Type | **Solidity (Single file)** |
| Compiler Version | **v0.8.24+commit.e64d63b7** |
| License | MIT |
| Optimization | Yes (200 runs) |
| Code Source | `packages/contracts/contracts/FireCoin.sol` |

---

## Need More Help?

1. Check BaseScan docs: https://docs.basescan.org/
2. Compare with verified Base contracts: https://sepolia.basescan.org/
3. Try the Standard JSON method if Single File fails

Once verified, your contract will show as "✅ Verified" and people can see all the code!
