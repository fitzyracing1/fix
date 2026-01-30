import { ethers } from "hardhat";

/**
 * Example: How a bot would interact with the payment system
 */
async function main() {
  const botPaymentAddress = "YOUR_BOT_PAYMENT_CONTRACT_ADDRESS";
  const fireCoinAddress = "0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D";
  
  const [owner, bot1, bot2] = await ethers.getSigners();
  
  console.log("Bot 1:", bot1.address);
  console.log("Bot 2:", bot2.address);
  
  // Get contracts
  const botPayment = await ethers.getContractAt("BotPayment", botPaymentAddress);
  const fireCoin = await ethers.getContractAt("FireCoin", fireCoinAddress);
  
  // Owner registers bots
  console.log("\n1. Registering bots...");
  await botPayment.registerBot(bot1.address);
  await botPayment.registerBot(bot2.address);
  console.log("✅ Bots registered");
  
  // Mint tokens to bot1
  console.log("\n2. Minting tokens to Bot 1...");
  const amount = ethers.parseUnits("10000", 18);
  await fireCoin.mint(bot1.address, amount);
  console.log("✅ Bot 1 has 10,000 FCOIN");
  
  // Bot1 approves and deposits
  console.log("\n3. Bot 1 depositing to payment system...");
  const depositAmount = ethers.parseUnits("5000", 18);
  await fireCoin.connect(bot1).approve(botPaymentAddress, depositAmount);
  await botPayment.connect(bot1).deposit(depositAmount);
  console.log("✅ Bot 1 deposited 5,000 FCOIN");
  
  // Bot1 pays Bot2
  console.log("\n4. Bot 1 paying Bot 2 for AI service...");
  const paymentAmount = ethers.parseUnits("100", 18);
  const tx = await botPayment.connect(bot1).payBot(
    bot2.address,
    paymentAmount,
    "AI text generation"
  );
  const receipt = await tx.wait();
  console.log("✅ Payment completed! TX:", receipt?.hash);
  
  // Check balances
  const bot1Balance = await botPayment.getBotBalance(bot1.address);
  const bot2Balance = await botPayment.getBotBalance(bot2.address);
  console.log("\n5. Final balances:");
  console.log("Bot 1:", ethers.formatUnits(bot1Balance, 18), "FCOIN");
  console.log("Bot 2:", ethers.formatUnits(bot2Balance, 18), "FCOIN");
  
  // Bot2 withdraws
  console.log("\n6. Bot 2 withdrawing...");
  await botPayment.connect(bot2).withdraw(bot2Balance);
  const bot2TokenBalance = await fireCoin.balanceOf(bot2.address);
  console.log("✅ Bot 2 withdrawn:", ethers.formatUnits(bot2TokenBalance, 18), "FCOIN");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
