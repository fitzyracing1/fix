import { ethers } from "ethers";

// Vercel Serverless Function - Bot Payment
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { botWalletKey, recipientAddress, amount, service } = req.body;
    
    if (!botWalletKey || !recipientAddress || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Contract details
    const BOT_PAYMENT_ADDRESS = process.env.BOT_PAYMENT_ADDRESS || "0x2BA57aF7B4055E26c4ad1E840e2078E8E9bCce8A";
    const FIRECOIN_ADDRESS = process.env.VITE_CONTRACT_ADDRESS || "0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D";
    const RPC_URL = process.env.BASE_RPC_URL || "https://mainnet.base.org";
    
    // ABIs
    const PAYMENT_ABI = [
      "function quickPay(address to, uint256 amount, string memory service) external returns (uint256)",
      "function getBotBalance(address bot) external view returns (uint256)"
    ];
    
    const ERC20_ABI = [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function balanceOf(address) view returns (uint256)"
    ];

    // Setup
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(botWalletKey, provider);
    const botPayment = new ethers.Contract(BOT_PAYMENT_ADDRESS, PAYMENT_ABI, wallet);
    const fireCoin = new ethers.Contract(FIRECOIN_ADDRESS, ERC20_ABI, wallet);

    // Convert amount to wei
    const amountWei = ethers.parseUnits(amount.toString(), 18);

    // Approve tokens
    const approveTx = await fireCoin.approve(BOT_PAYMENT_ADDRESS, amountWei);
    await approveTx.wait();

    // Make payment (10% fee goes to owner automatically)
    const paymentTx = await botPayment.quickPay(
      recipientAddress,
      amountWei,
      service || "Bot service payment"
    );
    const receipt = await paymentTx.wait();

    // Get updated balance
    const newBalance = await fireCoin.balanceOf(wallet.address);

    return res.status(200).json({
      success: true,
      botAddress: wallet.address,
      recipient: recipientAddress,
      amount: amount,
      fee: (amount * 0.10).toString() + " FCOIN (10%)",
      recipientReceived: (amount * 0.90).toString() + " FCOIN",
      txHash: receipt.hash,
      newBalance: ethers.formatUnits(newBalance, 18)
    });

  } catch (error: any) {
    console.error('Payment error:', error);
    return res.status(500).json({ 
      error: 'Payment failed', 
      details: error.message 
    });
  }
}
