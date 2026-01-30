import { ethers } from "hardhat";

async function main() {
  const fireCoinAddress = "0x1C78664AEd3c83dB40BFE1319e7461C3f5b6398D";
  const signers = await ethers.getSigners();
  const deployer = signers[0];
  
  console.log("Deploying BotPayment with:", deployer.address);
  console.log("FireCoin address:", fireCoinAddress);

  const BotPayment = await ethers.getContractFactory("BotPayment", deployer);
  const botPayment = await BotPayment.deploy(fireCoinAddress, deployer.address);
  await botPayment.waitForDeployment();

  const address = await botPayment.getAddress();
  console.log("✅ BotPayment deployed to:", address);
  console.log("\nNext steps:");
  console.log("1. Register bots: botPayment.registerBot(botAddress)");
  console.log("2. Bots deposit FireCoin: botPayment.deposit(amount)");
  console.log("3. Bots pay each other: botPayment.payBot(to, amount, 'service')");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
