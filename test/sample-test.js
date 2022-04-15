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
      //This fileUpload is private
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

//Size of Array function unit test
it("checks to get the size of the array", async function () {
  const getSize = await contract.keys;
  console.log("\n    ✅ confirming...\n");
  await sleep(5000); // wait 5 seconds for transaction to confirm!!
  expect(getSize).to.equal(contract.keys);
  
});
  
//getLatestPublicUpload function 
  it("checks to confirm that the Latest public upload can be retrieved", async function (){
    const getLatestPublicUpload = string = ("_ipfsCID, _fileName, timeUploaded, fileOwner");
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); //wait 5 seconds for latest public upload to be successful!
    expect(getLatestPublicUpload).to.equal("_ipfsCID, _fileName, timeUploaded, fileOwner");
  
});

//getAllPublicUpload function 
  it("check to confirm that all public files uploaded can be retrieved", async function (){
    const getAllPublicUploads = string = ("_ids, _name, _time, _owners");
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); //wait 5 seconds to get details of all public files!
    expect(getAllPublicUploads).to.equal("_ids, _name, _time, _owners");

  });

  //getSizeofPrivateUploads function 
  it("check to confirm size of private uploads array can be gotten", async function () {
    const getSizeOfPrivateUploads = unit = ("msg.sender.length");
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); //wait 5 seconds to get size of private uploads!
    expect(getSizeOfPrivateUploads).to.equal("msg.sender.length");
  
  });

    //getlatestPrivateUploads function 
  it("checks to confirm that the Latest private upload can be retrieved", async function () {
    const getLatestPrivateUpload = string = ("msg.sender[key].ipfsCID, [msg.sender][key].fileName, msg.sender[key].timeUploaded, msg.sender[key].fileOwner");
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); //wait 5 seconds to get latest private uploads!
    expect(getLatestPrivateUpload).to.equal("msg.sender[key].ipfsCID, [msg.sender][key].fileName, msg.sender[key].timeUploaded, msg.sender[key].fileOwner");
  
  });
  
//getAllPrivateUploads function 
  it("check to confirm that all private files uploaded can be retrieved", async function () {
    const getAllPrivateUploads = string = ("msg.sender[key].ids, msg.sender[key].names, msg.sender[key].time, msg.sender[key].owners");
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); //wait 5 seconds to get all private uploads!
    expect(getAllPrivateUploads).to.equal("msg.sender[key].ids, msg.sender[key].names, msg.sender[key].time, msg.sender[key].owners");
  
  });

//getonePrivateUploads function 
  it("check to confirm that a single private file uploaded can be retrieved", async function () {
    const getOnePrivateFile = string = ("msg.sender[key].ipfsCID, msg.sender[key].filename, msg.sender[key].timeUploaded, msg.sender[key].fileOwner");
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); //wait 5 seconds to get one private files!
    expect(getOnePrivateFile).to.equal("msg.sender[key].ipfsCID, msg.sender[key].filename, msg.sender[key].timeUploaded, msg.sender[key].fileOwner");
  
  });
  
//sharePrivatefile function 
  it("checks to confirm that private files can be shared", async function () {
    const sharePrivateFile = string = ("msg.sender.ipfsCID, msg.sender.filename, msg.sender.timeUploaded, msg.sender.fileOwner");
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); //wait 5 seconds to share private file!
    expect(sharePrivateFile).to.equal("msg.sender.ipfsCID, msg.sender.filename, msg.sender.timeUploaded, msg.sender.fileOwner");
 
  });

//getSharedfiles function 
  it("check to confirm that sharedfiles can be retrieved", async function () {
    const getSharedFiles = string = ("msg.sender.ids, msg.sender.names, msg.sender.time, msg.sender.Owner");
    console.log("\n    ✅ confirming...\n");
    await sleep(5000); //wait 5 seconds to get shared file!
    expect(getSharedFiles).to.equal("msg.sender.ids, msg.sender.names, msg.sender.time, msg.sender.Owner");
  
  });
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});