// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


contract DecentralizedLibrary { 
    address public owner = msg.sender;
    mapping (string => FileDetail) public collection; 
    mapping(string => bool) public uploaded;
    string[] public keys;
    mapping (string => bool) public fileExists;
   
    //Structs of all the file details we need
    struct FileDetail { 
        string ipfsCID; 
        string fileName; 
        string fileType; 
        uint dateUploaded; 
        address fileOwner;
        bool exist;  
    } 

    FileDetail[] public fileDetailsArray;

    event FileUploaded(string ipfsCID, string fileName, string fileType, uint dateUploaded); 

    modifier onlyOwner() {
        require(msg.sender == owner, "Only current address can do this");
        _;
    }
    constructor () { 
         
    } 

    function fileUpload(string memory _ipfsCID, string memory _fileName, string memory _fileType, uint _dateUploaded) public { 
        require(collection[_ipfsCID].exist == false, "File with this CID already exists."); 
        require(collection[_fileName].exist == false, "File with this Name already exists, Rename.");
        //initialising our struct with data
        FileDetail memory fileDetails = FileDetail(_ipfsCID, _fileName, _fileType, _dateUploaded, msg.sender, true); 

        //setting up ways to get data with these methods
        
        //assigning files with their cid, so we'll be able to retrieve files with CID
        collection[_ipfsCID] = fileDetails; 
        fileExists[_ipfsCID] = true;
        //assigning files with thier names, so we'll be able to retrieve files with name
        collection[_fileName] = fileDetails;
        fileExists[_fileName] = true;

        fileDetailsArray.push(fileDetails);


        //seeing the key of the mappings to be the fileNames, so when we neet to iterate,
        //it'll use keys[i] ==> mimicking collection[_fileName].ipfsCID for instance
        if(!uploaded[_fileName]) {
            uploaded[_fileName] = true;
            keys.push(_fileName);
        }

        emit FileUploaded(_ipfsCID, _fileName, _fileType, _dateUploaded);
    }

    function privateUpload(string memory _ipfsCID, string memory _fileName, string memory _fileType, uint _dateUploaded) public onlyOwner{
        fileUpload(_ipfsCID, _fileName, _fileType, _dateUploaded);
    }

    function getSize() external view returns(uint) {
        return keys.length;
    }

    function getFirstUpload() external view 
    returns( string memory, string memory, string memory, uint,address, bool) {
        return (
            collection[keys[0]].ipfsCID,
            collection[keys[0]].fileName,
            collection[keys[0]].fileType,
            collection[keys[0]].dateUploaded,
            collection[keys[0]].fileOwner,
            collection[keys[0]].exist
        );
    }

    function getLatestUpload() external view 
    returns ( string memory, string memory, string memory, uint, address, bool) {
        return (
            collection[keys[keys.length - 1]].ipfsCID,
            collection[keys[keys.length - 1]].fileName,
            collection[keys[keys.length - 1]].fileType,
            collection[keys[keys.length - 1]].dateUploaded,
            collection[keys[keys.length - 1]].fileOwner,
            collection[keys[keys.length - 1]].exist
        );
    }

    function getAllUploads() public view
    returns(string[] memory,string[] memory, string[] memory, uint[] memory, address[] memory, bool[] memory) {
        string [] memory ids = new string[](keys.length);
        string [] memory names = new string[](keys.length);
        string [] memory fts = new string[](keys.length);
        uint [] memory dates = new uint[](keys.length);
        address [] memory owners = new address [](keys.length);
        bool [] memory existence = new bool[](keys.length);

        for (uint i = 0; i < keys.length; i++) {
            ids[i] = collection[keys[i]].ipfsCID;
            names[i] = collection[keys[i]].fileName;
            fts[i] = collection[keys[i]].fileType;
            dates[i] = collection[keys[i]].dateUploaded;
            owners[i] = collection[keys[i]].fileOwner;
            existence[i] = collection[keys[i]].exist;
        }

        return(ids, names, fts, dates, owners, existence);
    }

    function getUploadedFileWithCID(string memory _ipfsCID) public view 
    returns (string memory, string memory, string memory, string memory, uint, address, bool) {
        require(fileExists[_ipfsCID] == true, "This file probably hasn't been uploaded yet, retry later or reupload");
        return ( 
            _ipfsCID,  
            collection[_ipfsCID].ipfsCID, 
            collection[_ipfsCID].fileName, 
            collection[_ipfsCID].fileType, 
            collection[_ipfsCID].dateUploaded, 
            collection[_ipfsCID].fileOwner,
            collection[_ipfsCID].exist 
        ); 
    }
    function getUploadedFilewithName(string memory _fileName) public view returns (string memory, string memory, string memory, string memory, uint, address, bool) {
        require(fileExists[_fileName] == true, "File does not exist");
        return ( 
            _fileName,  
            collection[_fileName].ipfsCID, 
            collection[_fileName].fileName, 
            collection[_fileName].fileType, 
            collection[_fileName].dateUploaded,
            collection[_fileName].fileOwner, 
            collection[_fileName].exist 
        ); 
    } 
}