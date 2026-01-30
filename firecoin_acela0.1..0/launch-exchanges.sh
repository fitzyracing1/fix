#!/bin/bash
# FireCoin - Quick Exchange Launch Guide

echo "🚀 FireCoin Exchange Launch Guide"
echo "===================================="
echo ""

# Your contract details
CONTRACT="0x0e384B32353253A0303447D8F67cbcaA907B0628"
NETWORK="Base Sepolia"
CHAIN_ID="84532"
EXPLORER="https://sepolia.basescan.org"
UNISWAP="https://app.uniswap.org/?chain=basesepolia"

echo "📋 Your Contract Details:"
echo "   Address:  $CONTRACT"
echo "   Network:  $NETWORK"
echo "   Chain ID: $CHAIN_ID"
echo ""

echo "🔗 Quick Links:"
echo "   1. Verify on Explorer:"
echo "      $EXPLORER/address/$CONTRACT"
echo ""
echo "   2. Create Uniswap Pool:"
echo "      $UNISWAP"
echo ""
echo "   3. Pool Analytics:"
echo "      https://info.uniswap.org/#/"
echo ""

echo "📝 Next Steps:"
echo "   ✓ Verify contract on BaseScan"
echo "   ✓ Open Uniswap and create liquidity pool"
echo "   ✓ Set fee tier to 0.30%"
echo "   ✓ Add initial liquidity (1M FCOIN + 10 ETH recommended)"
echo "   ✓ Register on CoinGecko & CoinMarketCap"
echo "   ✓ Announce on Twitter"
echo ""

echo "📊 Pool Creation Tips:"
echo "   • Use 0.30% fee tier for FCOIN/ETH pair"
echo "   • Set price range: -10% to +10%"
echo "   • Start with significant liquidity (1M+ tokens)"
echo "   • Monitor 24h volume and slippage"
echo ""

echo "🎯 Success Indicators:"
echo "   ✓ Pool appears on Uniswap info page"
echo "   ✓ Token shows price on CoinGecko"
echo "   ✓ Trading volume > 0"
echo "   ✓ LP fees accumulate"
echo ""

# Copy contract address to clipboard (macOS)
if command -v pbcopy &> /dev/null; then
    echo "$CONTRACT" | pbcopy
    echo "✅ Contract address copied to clipboard!"
fi
