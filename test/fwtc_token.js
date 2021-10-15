const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("FWTCToken", function () {
  it("Should mint new tokens", async function () {
    const Token = await ethers.getContractFactory("FWTCToken");
    const token = await Token.deploy(0);
    await token.deployed();

    const [owner, account1] = await ethers.getSigners();

    await token.connect(owner).mint(owner.address, 100);

    await token.connect(account1).mint(account1.address, 50);

    expect(await token.balanceOf(owner.address)).to.eq(100);
    expect(await token.balanceOf(account1.address)).to.eq(50);
    expect(await token.totalSupply()).to.eq(150);
  });

  it("Should burn tokens", async function () {
    const Token = await ethers.getContractFactory("FWTCToken");
    const token = await Token.deploy(0);
    await token.deployed();

    const [owner] = await ethers.getSigners();

    await token.connect(owner).mint(owner.address, 100);

    await token.connect(owner).burn(owner.address, 50);

    expect(await token.balanceOf(owner.address)).to.eq(50);
  });

  it("Should not mint pass the maximum availability", async function () {
    const Token = await ethers.getContractFactory("FWTCToken");
    const token = await Token.deploy(ethers.utils.parseUnits("1000000"));
    await token.deployed();

    const [owner] = await ethers.getSigners();

    const action = token.connect(owner).mint(owner.address, ethers.utils.parseUnits("100"));

    await expect(action).to.be.revertedWith("_amount exceeds token availability");
  })

  it("Should not mint pass the maximum availability", async function () {
    const Token = await ethers.getContractFactory("FWTCToken");
    const token = await Token.deploy(ethers.utils.parseUnits("1000000"));
    await token.deployed();

    const [owner] = await ethers.getSigners();

    const action = token.connect(owner).mint(owner.address, ethers.utils.parseUnits("100"));

    await expect(action).to.be.revertedWith("_amount exceeds token availability");
  })

  it("Should mint through payable function", async function() {
    const provider = waffle.provider;
    const Token = await ethers.getContractFactory("FWTCToken");
    const token = await Token.deploy(ethers.utils.parseUnits("1000000"));
    await token.deployed();

    const [owner] = await ethers.getSigners();

    const balanceETHbefore = await provider.getBalance(owner.address);
    const amount = ethers.utils.parseUnits("1")

    await token.connect(owner).specialMint(owner.address, amount, {value: amount});

    const balanceETHafter = await provider.getBalance(owner.address);

    expect(balanceETHbefore.sub(balanceETHafter)).to.be.closeTo(amount, ethers.utils.parseUnits("0.001"));
  })
});
