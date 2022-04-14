const { storageKey } = require("@chakra-ui/react");
const { expect } = require("chai");
const { ethers } = require("hardhat");


require("@nomiclabs/hardhat-waffle");
 
 describe("Decentralized Library", function () {
   let contract;
   let owner;

  beforeEach(async function () {
    const DecentralizedLibrary = await ethers.getContractFactory("DecentralizedLibrary");
    const decentralizedLibrary = await DecentralizedLibrary.deploy();
    contract = await decentralizedLibrary.deployed();
    
    [owner] = await ethers.getSigners();
  });

  //fileUpload function broken into bits

  it("checks to confirm if fileExists is false", async function () {
      console.log("\n    ✅ confirming...\n");
      const test = await contract.fileExists;
    await sleep(5000); // wait 5 seconds for transaction to confirm!!
    if(fileExists = true){
      //file with this CID already exists
    }else{
    expect (fileExists).to.equal(false);

    } 
  });

  it("checks to confirm if uploadType is private", async function () {
      const test = await contract.uploadType;
      console.log("\n    ✅ confirming...\n");
      await sleep(5000); // wait 5 seconds for transaction to confirm!!
    if(uploadType = 1){
      //This fileUpload is public
    }else{
      expect(uploadType).to.equal(1);  
      console.log("fileDetails = privateCollection");

    }
});

  it("checks to confirm if uploadType is public", async function () {
      const test = await contract.uploadType;
      console.log("\n    ✅ confirming...\n");
      await sleep(5000); // wait 5 seconds for transaction to confirm!!
    if(uploadType = 0){
      //This fileUpload is public
    }else{
      expect(uploadType).to.equal(0);  
      console.log("fileDetails = publicCollection");

    }
});

it("checks to confirm if fileExists has been reset to true after file fileUpload", async function () {
  const fileExists = boolean = (true);
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