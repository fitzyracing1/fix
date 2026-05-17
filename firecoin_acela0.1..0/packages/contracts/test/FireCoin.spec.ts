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
    await token.waitForDeployment();

    // attempt mining; just ensure it doesn't revert
    await expect(token.connect(owner).mine()).to.not.be.reverted;

    await token.connect(owner).pause();
    // The whenNotPaused modifier throws a custom error in newer OpenZeppelin versions
    await expect(token.connect(owner).transfer(user.address, 1n)).to.be.reverted;

    await token.connect(owner).unpause();
    await expect(token.connect(owner).transfer(user.address, 1n)).to.not.be.reverted;
  });
});

describe("FireCoinPG", function () {
  it("supports mining parameter updates and pause behavior", async function () {
    const [owner] = await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000", 18);
    const cap = ethers.parseUnits("2000", 18);

    const FireCoinPG = await ethers.getContractFactory("FireCoinPG");
    const token = await FireCoinPG.deploy(initialSupply, cap, owner.address, ethers.parseUnits("10", 18), 1000);
    await token.waitForDeployment();

    await expect(token.connect(owner).setReward(ethers.parseUnits("5", 18))).to.not.be.reverted;
    await expect(token.connect(owner).setDifficulty(10)).to.not.be.reverted;
    expect(await token.rewardPerBlock()).to.equal(ethers.parseUnits("5", 18));
    expect(await token.difficulty()).to.equal(10n);

    await token.connect(owner).pause();
    await expect(token.connect(owner).mine()).to.be.reverted;
    await token.connect(owner).unpause();
    await expect(token.connect(owner).mine()).to.not.be.reverted;
  });
});

describe("WrappedFireCoin", function () {
  it("wraps and unwraps 1:1", async function () {
    const [owner, user] = await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000", 18);
    const cap = ethers.parseUnits("2000", 18);
    const amount = ethers.parseUnits("25", 18);

    const FireCoin = await ethers.getContractFactory("FireCoin");
    const fireCoin = await FireCoin.deploy(initialSupply, cap, owner.address, ethers.parseUnits("10", 18), 1000);
    await fireCoin.waitForDeployment();

    const Wrapped = await ethers.getContractFactory("WrappedFireCoin");
    const wrapped = await Wrapped.deploy(await fireCoin.getAddress());
    await wrapped.waitForDeployment();

    await fireCoin.connect(owner).transfer(user.address, amount);
    await fireCoin.connect(user).approve(await wrapped.getAddress(), amount);

    await expect(wrapped.connect(user).wrap(amount)).to.not.be.reverted;
    expect(await wrapped.balanceOf(user.address)).to.equal(amount);

    await expect(wrapped.connect(user).unwrap(amount)).to.not.be.reverted;
    expect(await wrapped.balanceOf(user.address)).to.equal(0n);
    expect(await fireCoin.balanceOf(user.address)).to.equal(amount);
  });
});
