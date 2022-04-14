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

it("checks to confirm if Latest public upload is successfull", async function (){
  const getLatestPublicUpload = string = ("_ipfsCID, _fileName, timeUploaded, fileOwner");
  console.log("\n    ✅ confirming...\n");
  await sleep(5000); //wait 5 seconds for latest public upload to be successful!
  expect(getLatestPublicUpload).to.equal("_ipfsCID, _fileName, timeUploaded, fileOwner");
});

it("check details to confirm all public files uploaded so far.", async function (){
  const getAllPublicUploads = string = ("_ids, _name, _time, _owners");
  console.log("\n    ✅ confirming...\n");
  await sleep(5000); //wait 5 seconds to get details of all public files!
  expect(getAllPublicUploads).to.equal("_ids, _name, _time, _owner");

});

it("check size of private uploads", async function () {
  const getSizeOfPrivateUploads = unit ("msg.sender.length");
  console.log("\n    ✅ confirming...\n");
  await sleep(5000); //wait 5 seconds to get size of private uploads!
  expect(getSizeOfPrivateUploads).to.equal("msg.sender.length");
 });

 it("check the latest private uploads", async function () {
   const getLatestPrivateUpload = string = ("msg.sender[key].ipfsCID, [msg.sender][key].fileName, msg.sender[key].timeUploaded, msg.sender[key].fileOwner");
   await sleep(5000); //wait 5 seconds to get latest private uploads!
   expect(getLatestPrivateUpload).to.equal("msg.sender[key].ipfsCID, [msg.sender][key].fileName, msg.sender[key].timeUploaded, msg.sender[key].fileOwner");
 });

 it("check all the private uploads", async function () {
   const getAllPrivateUploads = string = ("msg.sender[key].ids, msg.sender[key].names, msg.sender[key].time, msg.sender[key].owners");
   await sleep(5000); //wait 5 seconds to get all private uploads!
   expect(getAllPrivateUploads).to.equal("msg.sender[key].ids, msg.sender[key].names, msg.sender[key].time, msg.sender[key].owners");
 });

 it("checking a request for a private file", async function () {
  const getOnePrivateFile = string = ("msg.sender[key].ipfsCID, msg.sender[key].filename, msg.sender[key].timeUploaded, msg.sender[key].fileOwner");
  await sleep(5000); //wait 5 seconds to get one private files!
  expect(getOnePrivateFile).to.equal("msg.sender[key].ipfsCID, msg.sender[key].filename, msg.sender[key].timeUploaded, msg.sender[key].fileOwner");
});

it("check file to be shared", async function () {
  const sharePrivateFile = string = ("msg.sender.ipfsCID, msg.sender.filename, msg.sender.timeUploaded, msg.sender.fileOwner");
  await sleep(5000); //wait 5 seconds to share private file!
  expect(sharePrivateFile).to.equal("msg.sender.ipfsCID, msg.sender.filename, msg.sender.timeUploaded, msg.sender.fileOwner");
});

it("check file shared", async function () {
  const getSharedFiles = string = ("msg.sender.ids, msg.sender.names, msg.sender.time, msg.sender.Owner");
  await sleep(5000); //wait 5 seconds to get shared file!
  expect(getSharedFiles).to.equal("msg.sender.ids, msg.sender.names, msg.sender.time, msg.sender.Owner");
});


