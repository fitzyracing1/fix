#!/bin/bash
# FireCoin Exchange Deployment Helper Script

set -e

echo "🔄 FireCoin Exchange Deployment Helper"
echo "======================================"
echo ""

# Configuration
NETWORK=${1:-"sepolia"}
CONTRACT_ADDRESS=${2:-""}

if [ -z "$CONTRACT_ADDRESS" ]; then
    echo "❌ Error: Contract address required"
    echo "Usage: ./exchange-deploy.sh <network> <contract_address>"
    echo ""
    echo "Example: ./exchange-deploy.sh sepolia 0x1234..."
    exit 1
fi

echo "📋 Configuration:"
echo "   Network: $NETWORK"
echo "   Contract: $CONTRACT_ADDRESS"
echo ""

# Network-specific URLs
case $NETWORK in
    sepolia)
        EXPLORER="https://sepolia.etherscan.io"
        UNISWAP="https://app.uniswap.org/?chain=sepolia"
        RPC="https://eth-sepolia.g.alchemy.com/v2"
        ;;
    base-sepolia|baseSepolia)
        EXPLORER="https://sepolia.basescan.org"
        UNISWAP="https://app.uniswap.org/?chain=basesepolia"
        RPC="https://sepolia.base.org"
        ;;
    polygon-mumbai|mumbai)
        EXPLORER="https://mumbai.polygonscan.com"
        UNISWAP="https://app.uniswap.org/?chain=polygon"
        RPC="https://polygon-mumbai-pokt.nodies.app"
        ;;
    *)
        echo "❌ Unknown network: $NETWORK"
        echo "Supported: sepolia, base-sepolia, polygon-mumbai"
        exit 1
        ;;
esac

echo "🔗 Useful Links:"
echo "   Token on Explorer: $EXPLORER/token/$CONTRACT_ADDRESS"
echo "   Uniswap Interface: $UNISWAP"
echo ""

echo "📝 Next Steps to Deploy to Exchanges:"
echo ""
echo "1️⃣  Verify Your Contract"
echo "   - Visit: $EXPLORER/address/$CONTRACT_ADDRESS"
echo "   - Click 'Contract'"
echo "   - If not verified, click 'Verify and Publish'"
echo ""

echo "2️⃣  Create Uniswap Pool"
echo "   - Visit: $UNISWAP"
echo "   - Click 'Add Liquidity'"
echo "   - Select FireCoin (FCOIN) and ETH"
echo "   - Set fee tier to 0.30%"
echo "   - Input liquidity amounts"
echo "   - Confirm transaction"
echo ""

echo "3️⃣  Register on Tracking Sites"
echo "   - CoinGecko: https://www.coingecko.com/en/request-coin"
echo "   - CoinMarketCap: https://coinmarketcap.com/request/"
echo "   - DeFiLlama: https://defillama.com"
echo ""

echo "4️⃣  Monitor Pool Health"
echo "   - Watch 24h volume"
echo "   - Track price stability"
echo "   - Monitor slippage"
echo ""

echo "✅ Script complete! Open links in browser to proceed."
