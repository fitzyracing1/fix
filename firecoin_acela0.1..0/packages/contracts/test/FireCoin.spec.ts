import { expect } from "chai";
import { ethers } from "hardhat";

describe("FireCoin", function () {
  it("mints initial supply to owner and enforces cap", async function () {
    const [owner, user] = await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000", 18);
    const cap = ethers.parseUnits("2000", 18);

    const FireCoin = await ethers.getContractFactory("FireCoin");
    const token = await FireCoin.deploy(initialSupply, cap, owner.address, ethers.parseUnits("10", 18), 1000);
    await token.waitForDeployment();

    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);

    await expect(token.connect(owner).mint(owner.address, ethers.parseUnits("1500", 18)))
      .to.be.revertedWith("Cap exceeded");

    await token.connect(owner).mint(user.address, ethers.parseUnits("1000", 18));
    expect(await token.totalSupply()).to.equal(ethers.parseUnits("2000", 18));
    expect(await token.balanceOf(user.address)).to.equal(ethers.parseUnits("1000", 18));
  });

  it("pauses transfers", async function () {
    const [owner, user] = await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000", 18);
    const cap = ethers.parseUnits("2000", 18);

    const FireCoin = await ethers.getContractFactory("FireCoin");
    const token = await FireCoin.deploy(initialSupply, cap, owner.address, ethers.parseUnits("10", 18), 1000);

    // attempt mining; just ensure it doesn't revert
    await expect(token.connect(owner).mine()).to.not.be.reverted;
    await token.waitForDeployment();

    await token.connect(owner).pause();
    // The whenNotPaused modifier throws a custom error in newer OpenZeppelin versions
    await expect(token.connect(owner).transfer(user.address, 1n)).to.be.reverted;

    await token.connect(owner).unpause();
    await expect(token.connect(owner).transfer(user.address, 1n)).to.not.be.reverted;
  });
});
