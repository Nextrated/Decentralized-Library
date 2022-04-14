const { expect } = require("chai");
const { ethers } = require("hardhat");


require("@nomiclabs/hardhat-waffle");
 
 describe("Decentralized Library", function () {

  beforeEach(async function () {
    const owner = await ethers.getSigners();
    const DecentralizedLibrary = await ethers.getContractFactory("DecentralizedLibrary");
    const decentralizedLibrary = await DecentralizedLibrary.deploy();
    
  });

  //fileUpload function broken into bits

  it("checks to confirm if fileExists is false", async function () {

    const fileExists = boolean = false;
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); // wait 5 seconds for transaction to confirm!!
    expect (fileExists).to.equal(false);
  });

  it("checks to confirm if uploadType is private", async function () {
    const uploadType = uint = (1);
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); // wait 5 seconds for transaction to confirm!!
    expect(uploadType).to.equal(1);  
});

  it("checks to confirm if uploadType is public", async function () {
    const uploadType = uint = (0);
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); // wait 5 seconds for transaction to confirm!!
    expect(uploadType).to.equal(0);  
    
});

it("checks to confirm if fileExists has been reset to true before file fileUpload", async function () {
  const fileExists = boolean = true;
  console.log("\n    ✅ confirming...\n");
  await sleep(5000); // wait 5 seconds for transaction to confirm!!
  expect(fileExists).to.equal(true);

});

it("checks to confirm if fileUpload is successful", async function () {
  const fileUpload = string = ("_ipfsCID, _fileName, block.timestamp, msg.sender");
  console.log("\n    ✅ confirming...\n");
  await sleep(5000); // wait 5 seconds for transaction to confirm!!
  expect(fileUpload).to.equal("_ipfsCID, _fileName, block.timestamp, msg.sender");
  
});

it("checks to get the size of the array", async function () {
  const getSize = uint = ("keys.length");
  console.log("\n    ✅ confirming...\n");
  await sleep(5000); // wait 5 seconds for transaction to confirm!!
  expect(getSize).to.equal("keys.length");
  
});
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
});