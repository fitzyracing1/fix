# 🔧 BaseScan Verification Troubleshooting

## Problem: "Unable to find matching Contract Bytecode and ABI"

This error means BaseScan compiled the code but got different bytecode than what's on-chain.

### Common Causes & Solutions

---

## Solution 1: Check Your Compiler Version ⭐ TRY THIS FIRST

The exact compiler version matters! Try these versions in this order:

1. **v0.8.24+commit.e64d63b7** (Most likely)
2. **v0.8.24** (Generic)
3. **v0.8.24+commit.e64d63b7 (Berlin)**
4. **v0.8.24+commit.e64d63b7 (London)**

### How to Select in BaseScan:
- Click "Compiler Version" dropdown
- Search for "0.8.24"
- Try different builds

---

## Solution 2: Verify Constructor Arguments

Your contract WAS deployed with these parameters. You may need to provide them in **ABI-encoded format**:

**Your Deployment Parameters:**
```
initialSupply: 1,000,000 FCOIN (1000000000000000000000000)
cap: 100,000,000 FCOIN (100000000000000000000000000)
owner: 0xfc8Cda82664CB33a58bDdE103bAD515FB8E323F5
rewardPerBlock: 10 FCOIN (10000000000000000000)
difficulty: 1000
```

**Try these Constructor Argument formats on BaseScan:**

**Option 1 (Full ABI-encoded):**
```
0x000000000000000000000000000000000000000000000000d3c21bcecceda1000000000000000000000000000000000000000000000000152d02c7e14af6800000000000000000000000000000fc8cda82664cb33a58bdde103bad515fb8e323f50000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000000000000000003e8
```

**Option 2 (Leave blank)** - BaseScan should auto-detect if contract matches

---

## Solution 3: Use Multi-File Verification

If Single File still fails:

1. Go back to BaseScan verification
2. Select **"Solidity (Multi-File)"**
3. Upload these files from `packages/contracts/artifacts`:
   - `contracts/FireCoin.sol`
   - `@openzeppelin/contracts/token/ERC20/ERC20.sol`
   - `@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol`
   - `@openzeppelin/contracts/utils/Pausable.sol`
   - `@openzeppelin/contracts/access/Ownable.sol`

---

## Solution 4: Try API Verification (Advanced)

If web form fails, try BaseScan API:

```bash
# Get your API key from https://basescan.org/apis

curl -X POST https://api-sepolia.basescan.org/api \
  -d "apikey=YOUR_API_KEY" \
  -d "module=contract" \
  -d "action=verifysourcecode" \
  -d "contractaddress=0x0e384B32353253A0303447D8F67cbcaA907B0628" \
  -d "sourceCode=[YOUR_FLATTENED_CODE]" \
  -d "codeformat=solidity-single-file" \
  -d "contractname=FireCoin" \
  -d "compilerversion=v0.8.24+commit.e64d63b7" \
  -d "optimizationUsed=1" \
  -d "runs=200"
```

---

## Solution 5: Re-verify Everything

Clear and start fresh:

1. **Go to contract page**: https://sepolia.basescan.org/address/0x0e384B32353253A0303447D8F67cbcaA907B0628

2. **Click "Contract" tab**

3. **Check if already verified?** 
   - If you see "Compiler Version: v0.8.24", you're good!
   - If not, click "Verify and Publish"

4. **Use these EXACT settings:**
   - Compiler Type: **Solidity (Single file)**
   - Compiler Version: **v0.8.24+commit.e64d63b7**
   - License: **MIT**
   - Optimization: **Enabled**
   - Runs: **200**
   - Code: **Copy entire flattened code** (from FireCoin.flattened.sol)
   - Constructor Args: **Leave BLANK** (or use the ABI-encoded above)

5. **Click "Verify and Publish"**

---

## Solution 6: Check if Contract is Already Verified!

Sometimes contracts auto-verify. Visit:
https://sepolia.basescan.org/address/0x0e384B32353253A0303447D8F67cbcaA907B0628

Scroll down to "Contract" section. Do you see:
- ✅ **Green checkmark** = Already verified!
- ❌ **No checkmark** = Not verified yet

---

## If All Else Fails

1. **Contact BaseScan Support**: https://basescan.org/
2. **Try on Etherscan instead** (Sepolia): Deploy to Sepolia and verify there
3. **Use Hardhat Etherscan plugin** for automatic verification

---

## Quick Reference Checklist

- [ ] Compiler Version: `v0.8.24+commit.e64d63b7`
- [ ] Compiler Type: Solidity (Single file)
- [ ] License: MIT  
- [ ] Optimization: Enabled (200 runs)
- [ ] Contract Code: Flattened (from FireCoin.flattened.sol)
- [ ] Constructor Args: Leave blank or provide ABI-encoded
- [ ] Contract Name: FireCoin
- [ ] EVM Version: Default/Paris

---

## Need Help?

Your contract details:
- **Address:** 0x0e384B32353253A0303447D8F67cbcaA907B0628
- **Network:** Base Sepolia
- **Explorer:** https://sepolia.basescan.org/address/0x0e384B32353253A0303447D8F67cbcaA907B0628

Try Solution 1 first (compiler version), then Solution 2 (constructor args).
