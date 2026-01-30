import { ethers } from "ethers";

// Vercel Serverless Function - Auto Miner Bot
export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { botWalletKey, attempts = 1 } = req.body;
    
    if (!botWalletKey) {
      return res.status(400).json({ error: 'Bot wallet private key required' });
    }

    // Contract details
    const FIRECOIN_ADDRESS = process.env.VITE_CONTRACT_ADDRESS || "0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D";
    const RPC_URL = process.env.BASE_RPC_URL || "https://mainnet.base.org";
    
    // FireCoin ABI (mine function)
    const ABI = [
      "function mine() external returns (bool)",
      "function balanceOf(address) view returns (uint256)"
    ];

    // Setup
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(botWalletKey, provider);
    const fireCoin = new ethers.Contract(FIRECOIN_ADDRESS, ABI, wallet);

    const results: any[] = [];
    let successCount = 0;

    // Attempt mining
    for (let i = 0; i < attempts; i++) {
      try {
        const tx = await fireCoin.mine();
        const receipt = await tx.wait();
        
        const success = receipt.status === 1;
        if (success) successCount++;
        
        results.push({
          attempt: i + 1,
          success,
          txHash: receipt.hash,
          gasUsed: receipt.gasUsed.toString()
        });
      } catch (error: any) {
        results.push({
          attempt: i + 1,
          success: false,
          error: error.message
        });
      }
    }

    // Get new balance
    const balance = await fireCoin.balanceOf(wallet.address);

    return res.status(200).json({
      success: true,
      botAddress: wallet.address,
      miningAttempts: attempts,
      successfulMines: successCount,
      newBalance: ethers.formatUnits(balance, 18),
      results
    });

  } catch (error: any) {
    console.error('Mining error:', error);
    return res.status(500).json({ 
      error: 'Mining failed', 
      details: error.message 
    });
  }
}
