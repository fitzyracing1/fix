/**
 * FireCoin Exchange Integration Helper
 * Helps deploy liquidity pools to Uniswap V3 and other DEXes
 */

import { ethers } from 'ethers';

interface PoolConfig {
  tokenA: string; // FireCoin contract address
  tokenB: string; // ETH (WETH9) address
  fee: 500 | 3000 | 10000; // 0.05%, 0.30%, 1.00%
  amountTokenA: string; // Amount of FireCoin (in wei)
  amountTokenB: string; // Amount of WETH (in wei)
  priceLower: number; // Lower price bound
  priceUpper: number; // Upper price bound
}

interface NetworkConfig {
  name: string;
  rpcUrl: string;
  uniswapRouter: string;
  positionManager: string;
  quoter: string;
  weth9: string;
  explorerUrl: string;
  uniswapUrl: string;
}

// Network configurations
const NETWORKS: Record<string, NetworkConfig> = {
  sepolia: {
    name: 'Ethereum Sepolia',
    rpcUrl: process.env.VITE_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo',
    uniswapRouter: '0x68b3465833fb72B5A828cCEEF57B2b3e0B3CACC6', // SwapRouter02
    positionManager: '0xC36442b4a4522E871399CD717aBD90F89f869696', // NonfungiblePositionManager
    quoter: '0x61fFE014bA17989E8eFe8EB54bEFE1deb88B9e1E', // Quoter V2
    weth9: '0xfFf9976782d46CC05630D92EE39FFf4c1F2d9c7a',
    explorerUrl: 'https://sepolia.etherscan.io',
    uniswapUrl: 'https://app.uniswap.org/?chain=sepolia',
  },
  'base-sepolia': {
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    uniswapRouter: '0x2626664c2f4efc5e11915033d5d8fcb86d249f00', // SwapRouter02 on Base
    positionManager: '0x03a520b32C04BF3bEEd7BDd5e140a8c5e4b4F0e0', // NonfungiblePositionManager
    quoter: '0x3d4e44eb1374240CE5F1B048ec6d64F193ceAeA0', // Quoter V2
    weth9: '0x4200000000000000000000000000000000000006', // WETH on Base
    explorerUrl: 'https://sepolia.basescan.org',
    uniswapUrl: 'https://app.uniswap.org/?chain=basesepolia',
  },
  mumbai: {
    name: 'Polygon Mumbai',
    rpcUrl: 'https://polygon-mumbai-pokt.nodies.app',
    uniswapRouter: '0x68b3465833fb72B5A828cCEEF57B2b3e0B3CACC6',
    positionManager: '0xC36442b4a4522E871399CD717aBD90F89f869696',
    quoter: '0x61fFE014bA17989E8eFe8EB54bEFE1deb88B9e1E',
    weth9: '0x9c3C9283D3e44854697Cd22D3Faa240Ddd87f4aC', // WMATIC
    explorerUrl: 'https://mumbai.polygonscan.com',
    uniswapUrl: 'https://app.uniswap.org/?chain=polygon',
  },
};

/**
 * Get network configuration
 */
export function getNetworkConfig(network: string): NetworkConfig {
  const config = NETWORKS[network.toLowerCase()];
  if (!config) {
    throw new Error(
      `Unknown network: ${network}. Supported: ${Object.keys(NETWORKS).join(', ')}`
    );
  }
  return config;
}

/**
 * Calculate token amounts needed for liquidity pool
 */
export function calculateLiquidityAmounts(
  fcoinPrice: number, // price of 1 FCOIN in ETH
  ethAmount: string, // amount of ETH to provide (in wei)
  decimals: number = 18
): { fcoinAmount: string; ethAmount: string } {
  const ethBN = ethers.toBigInt(ethAmount);
  const fcoinBN = ethBN / ethers.toBigInt(Math.floor(fcoinPrice * 1e18));

  return {
    fcoinAmount: fcoinBN.toString(),
    ethAmount: ethAmount,
  };
}

/**
 * Calculate Uniswap V3 price ticks from decimal prices
 * Reference: https://docs.uniswap.org/concepts/V3-overview/concentrated-liquidity
 */
export function priceToPriceWithDecimals(
  price: number,
  decimals0: number = 18,
  decimals1: number = 18
): number {
  return price * Math.pow(10, decimals1 - decimals0);
}

/**
 * Get Uniswap pool fee tier recommendation based on volatility
 */
export function getRecommendedFeeTier(volatility: 'low' | 'medium' | 'high'): 500 | 3000 | 10000 {
  switch (volatility) {
    case 'low':
      return 500; // 0.05% - for stable pairs
    case 'medium':
      return 3000; // 0.30% - standard
    case 'high':
      return 10000; // 1.00% - volatile pairs
  }
}

/**
 * Format pool configuration for display
 */
export function formatPoolConfig(config: PoolConfig, network: NetworkConfig): string {
  return `
🏊 Pool Configuration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Token A (FireCoin):   ${config.tokenA}
Token B (WETH):       ${config.tokenB}
Network:              ${network.name}
Fee Tier:             ${(config.fee / 10000) * 100}%
FireCoin Amount:      ${ethers.formatUnits(config.amountTokenA, 18)} FCOIN
WETH Amount:          ${ethers.formatUnits(config.amountTokenB, 18)} WETH
Price Range:          ${config.priceLower} - ${config.priceUpper}

📍 Links:
Explorer:             ${network.explorerUrl}
Uniswap:              ${network.uniswapUrl}
  `;
}

/**
 * Get recommended initial price based on token allocation
 */
export function getInitialPrice(totalSupply: string, listingAllocation: string): number {
  const supply = Number(ethers.formatUnits(totalSupply, 18));
  const allocation = Number(ethers.formatUnits(listingAllocation, 18));
  
  // Allocate 100 ETH worth of initial liquidity
  // Price = portion of supply / ETH amount
  return allocation / 100;
}

/**
 * Estimate swap slippage for given liquidity
 */
export function estimateSlippage(
  inputAmount: string,
  poolLiquidity: string,
  decimals: number = 18
): number {
  const input = Number(ethers.formatUnits(inputAmount, decimals));
  const liquidity = Number(ethers.formatUnits(poolLiquidity, decimals));
  
  // Simplified formula: slippage = (inputAmount / poolLiquidity) * 100
  return (input / liquidity) * 100;
}

/**
 * Generate deployment checklist
 */
export function generateDeploymentChecklist(): string {
  return `
✅ FireCoin Exchange Deployment Checklist
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEFORE DEPLOYMENT:
  ☐ Contract deployed to target network
  ☐ Contract verified on block explorer
  ☐ Have minimum FCOIN tokens (for liquidity)
  ☐ Have ETH/native tokens (for gas + liquidity)
  ☐ MetaMask or similar wallet set up

DEPLOYMENT:
  ☐ Approve FCOIN tokens for Uniswap
  ☐ Visit Uniswap interface
  ☐ Create FCOIN/ETH pool
  ☐ Set fee tier (recommend: 0.30%)
  ☐ Input liquidity amounts
  ☐ Confirm transaction

POST-DEPLOYMENT:
  ☐ Verify pool created successfully
  ☐ Check liquidity pool address
  ☐ Register on CoinGecko
  ☐ Register on CoinMarketCap
  ☐ Submit to token lists (Uniswap, MetaMask)
  ☐ Announce on social media
  ☐ Monitor pool health (volume, slippage)

EXPANSION:
  ☐ Deploy to additional chains
  ☐ Add to other DEXes (SushiSwap, Curve)
  ☐ Launch mining incentives
  ☐ Plan mainnet deployment
  ☐ Approach CEX listings
  `;
}

/**
 * Export helper for CLI usage
 */
export function printNetworkInfo(network: string): void {
  const config = getNetworkConfig(network);
  
  console.log(`
🌐 Network Information - ${config.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RPC URL:              ${config.rpcUrl}
Uniswap Router:       ${config.uniswapRouter}
Position Manager:     ${config.positionManager}
WETH9 Token:          ${config.weth9}

📍 Links:
Block Explorer:       ${config.explorerUrl}
Uniswap Interface:    ${config.uniswapUrl}
  `);
}

export default {
  getNetworkConfig,
  calculateLiquidityAmounts,
  getRecommendedFeeTier,
  formatPoolConfig,
  getInitialPrice,
  estimateSlippage,
  generateDeploymentChecklist,
  printNetworkInfo,
};
