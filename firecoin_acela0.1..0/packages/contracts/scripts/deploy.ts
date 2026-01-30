import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const signers = await ethers.getSigners();
  
  if (signers.length === 0) {
    throw new Error("No signers available. Check PRIVATE_KEY in .env");
  }

  const deployer = signers[0];
  
  console.log("Deploying with:", deployer.address);

  const initialSupply = ethers.parseUnits("1000000", 18);
  const cap = ethers.parseUnits("100000000", 18);
  const rewardPerBlock = ethers.parseUnits("10", 18);
  const difficulty = 1000;

  const FireCoin = await ethers.getContractFactory("FireCoin", deployer);
  const fireCoin = await FireCoin.deploy(initialSupply, cap, deployer.address, rewardPerBlock, difficulty);
  await fireCoin.waitForDeployment();

  console.log("FireCoin deployed to:", await fireCoin.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
