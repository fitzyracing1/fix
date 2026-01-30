import { ethers } from "ethers";

// Vercel Serverless Function - Bot Status/Balance Check
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const botAddress = req.method === 'GET' 
      ? req.query.address 
      : req.body.address;
    
    if (!botAddress) {
      return res.status(400).json({ error: 'Bot address required' });
    }

    // Contract details
    const FIRECOIN_ADDRESS = process.env.VITE_CONTRACT_ADDRESS || "0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D";
    const BOT_PAYMENT_ADDRESS = process.env.BOT_PAYMENT_ADDRESS || "0x2BA57aF7B4055E26c4ad1E840e2078E8E9bCce8A";
    const RPC_URL = process.env.BASE_RPC_URL || "https://mainnet.base.org";
    
    // ABIs
    const ERC20_ABI = ["function balanceOf(address) view returns (uint256)"];
    const PAYMENT_ABI = [
      "function registeredBots(address) view returns (bool)",
      "function getBotBalance(address bot) external view returns (uint256)"
    ];

    // Setup
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const fireCoin = new ethers.Contract(FIRECOIN_ADDRESS, ERC20_ABI, provider);
    const botPayment = new ethers.Contract(BOT_PAYMENT_ADDRESS, PAYMENT_ABI, provider);

    // Get balances
    const [tokenBalance, depositBalance, isRegistered] = await Promise.all([
      fireCoin.balanceOf(botAddress),
      botPayment.getBotBalance(botAddress),
      botPayment.registeredBots(botAddress)
    ]);

    return res.status(200).json({
      botAddress,
      tokenBalance: ethers.formatUnits(tokenBalance, 18),
      depositBalance: ethers.formatUnits(depositBalance, 18),
      isRegistered,
      contracts: {
        fireCoin: FIRECOIN_ADDRESS,
        botPayment: BOT_PAYMENT_ADDRESS
      }
    });

  } catch (error: any) {
    console.error('Status error:', error);
    return res.status(500).json({ 
      error: 'Status check failed', 
      details: error.message 
    });
  }
}
