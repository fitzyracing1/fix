import { config as dotenvConfig } from "dotenv";
import path from "path";
dotenvConfig({ path: path.resolve(__dirname, "../../.env") });
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const SEPOLIA_URL = process.env.SEPOLIA_RPC_URL || "";
const BASE_SEPOLIA_URL = process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org";
const BASE_URL = process.env.BASE_RPC_URL || "https://mainnet.base.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  paths: {
    sources: "contracts",
    tests: "test",
    cache: "cache",
    artifacts: "artifacts"
  },
  networks: {
    localhost: { url: "http://127.0.0.1:8545" },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: PRIVATE_KEY && PRIVATE_KEY.length > 2 ? [PRIVATE_KEY] : []
    },
    baseSepolia: {
      url: BASE_SEPOLIA_URL,
      accounts: PRIVATE_KEY && PRIVATE_KEY.length > 2 ? [PRIVATE_KEY] : [],
      chainId: 84532
    },
    base: {
      url: BASE_URL,
      accounts: PRIVATE_KEY && PRIVATE_KEY.length > 2 ? [PRIVATE_KEY] : [],
      chainId: 8453
    }
  },
  etherscan: {
    apiKey: process.env.BASESCAN_API_KEY || "",
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  }
};

export default config;
