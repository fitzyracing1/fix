import { ethers } from "hardhat";

async function main() {
  let deployer;
  const signers = await ethers.getSigners();
  
  if (signers.length > 0) {
    deployer = signers[0];
  } else {
    // Fallback: use private key from env
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("PRIVATE_KEY not set in .env file");
    }
    const provider = ethers.provider;
    deployer = new ethers.Wallet(privateKey, provider);
  }
  
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
