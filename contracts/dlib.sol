// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

/// @title A decentralized library
/// @author Team Ace [Blockgames] - Anyanwu Maureen, Johnmicheal, Phyf3, Chidera, Pearl, JNIC
/// @notice You can use to this contract store files in a decentralized and distributed system 
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This contract is a PoC.
contract DLIB { 

    address public owner = msg.sender;
    mapping (string => FileDetail) public collection; 
    mapping(string => bool) public uploaded;
    string[] public keys;

    mapping (string => FileDetail) public privateCollection;
    string[] public pKey;


    mapping (string => bool) public fileExists;
   
    /// @notice Structs of all the file details.
    struct FileDetail { 
        string ipfsCID; 
        string fileName; 
        uint dateUploaded; 
        address fileOwner;
    } 

    FileDetail[] public fileDetailsArray;

    event FileUploaded(string ipfsCID, string fileName,uint dateUploaded , address fileOwner); 

    /// @notice Makes sure the current address is the only owner -> for private files functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only current address can do this");
        _;
    }

    constructor () {   

    } 

    /// @notice Upload files to a public dashboard.
    /// @param  _ipfsCID The CID hash of the file uploaded to ipfs/any decentralised storage
    /// @param  _fileName The file name of the file
    /// @dev    The params are stored on the blockchain on function call, lookups can be done 
    function publicUpload(string memory _ipfsCID, string memory _fileName) 
    public { 
        require(fileExists[_ipfsCID] == false, "File with this CID already exists."); 
        require(fileExists[_fileName] == false, "File with this Name already exists, Rename.");
        //initialising our struct with data
        FileDetail memory fileDetails = FileDetail(_ipfsCID, _fileName, block.timestamp, msg.sender); 

        //setting up ways to get data with these methods
        
        //assigning files with their cid, so we'll be able to retrieve files with CID
        collection[_ipfsCID] = fileDetails; 
        fileExists[_ipfsCID] = true;
        fileExists[_fileName] = true;

        //seeing the key of the mappings to be the fileNames, so when we neet to iterate,
        //it'll use keys[i] ==> mimicking collection[_ipfsCID].ipfsCID for instance
        if(!uploaded[_ipfsCID]) {
            uploaded[_ipfsCID] = true;
            keys.push(_ipfsCID);
        }

        emit FileUploaded(_ipfsCID, _fileName, block.timestamp, msg.sender);

    }

   
     /// @notice Returns the total number of files uploaded.
    /// @dev    Returns only a fixed number that's the fixed length of the keys array from the iterable mapping.
    /// @return Length in unsigned integer
    function getSize() external view returns(uint) {
        return keys.length;
    }


    /// @notice Returns details about the last public file uploaded.
    /// @dev    Details returned are the one's stored in the blockchain on upload.
    /// @return ipfsCID of last public upload.
    /// @return File name of the last public upload.
    /// @return Date the public file got uploaded 
    /// @return Address of the public uploader.
    function getLatestPublicUpload() external view 
    returns ( string memory, string memory, uint, address) {
        uint len = keys.length;
        string memory key = keys[len - 1];
        return (
            collection[key].ipfsCID,
            collection[key].fileName,
            collection[key].dateUploaded,
            collection[key].fileOwner        
        );
    }
    


    /// @notice Returns details about all public files uploaded so far.
    /// @dev    Details returned are the one's stored in the blockchain on upload.
    /// @return ipfsCID of all public uploads.
    /// @return File name of all the public uploads.
    /// @return Upload date of all the public uploads.
    /// @return Address of the public uploader.
    function getAllPublicUploads() public view
    returns(string[] memory,string[] memory, uint[] memory, address[] memory) {
        uint len = keys.length;

        string [] memory ids = new string[](len);
        string [] memory names = new string[](len);
        uint [] memory time = new uint[](len);
        address [] memory owners = new address [](len);

        for (uint i = 0; i < keys.length; ++i) {
            string memory key = keys[i];

            ids[i] = collection[key].ipfsCID;
            names[i] = collection[key].fileName;
            time[i] = collection[key].dateUploaded;
            owners[i] = collection[key].fileOwner;
        }

        return(ids, names, time, owners);
    }

    /*

    function getUploadedFileWithCID(string memory _ipfsCID) public view 
    returns (string memory, string memory, string memory, uint, address) {
        require(fileExists[_ipfsCID] == true, "This file probably hasn't been uploaded yet, retry later or reupload");
        return ( 
            _ipfsCID,  
            collection[_ipfsCID].ipfsCID, 
            collection[_ipfsCID].fileName, 
            collection[_ipfsCID].dateUploaded, 
            collection[_ipfsCID].fileOwner,
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
         */
    
    
     

    /// @notice Upload files to a private dashboard just for the current address
    /// @param  _ipfsCID The CID hash of the file uploaded to ipfs/any decentralised storage
    /// @param  _fileName The file name of the filw
    /// @dev    The params are stored on the blockchain on function call, lookups can be done 
     function privateUpload(string memory _ipfsCID, string memory _fileName)
      public onlyOwner{
        require(fileExists[_ipfsCID] == false, "File with this CID already exists."); 
        require(fileExists[_fileName] == false, "File with this Name already exists, Rename.");

        //initialising our struct with data
        FileDetail memory fileDetails = FileDetail(_ipfsCID, _fileName, block.timestamp, msg.sender); 
        
        //assigning files with their cid, so we'll be able to retrieve files with CID
        privateCollection[_ipfsCID] = fileDetails; 
        fileExists[_ipfsCID] = true;
        fileExists[_fileName] = true;

        
        if(!uploaded[_ipfsCID]) {
            uploaded[_ipfsCID] = true;
            pKey.push(_ipfsCID);
        }

        emit FileUploaded(_ipfsCID, _fileName, block.timestamp, msg.sender);

    }

    /// @notice Returns the total number of files uploaded.
    /// @dev    Returns only a fixed number that's the fixed length of the keys array from the iterable mapping.
    /// @return Length in unsigned integer
    function getSizeOfPrivateUploads() external view onlyOwner returns(uint) {
        return pKey.length;
    }


    /// @notice Returns details about the last private file uploaded.
    /// @dev    Details returned are the one's stored in the blockchain on upload.
    /// @return ipfsCID of last private upload.
    /// @return File name of the last private upload.
    /// @return Date the private file got uploaded 
    /// @return Address of the private uploader.
    function getLatestPrivateUpload() external view onlyOwner
    returns ( string memory, string memory, uint, address) {
        uint len = pKey.length;
        string memory key = pKey[len - 1];
        return (
            privateCollection[key].ipfsCID,
            privateCollection[key].fileName,
            privateCollection[key].dateUploaded,
            privateCollection[key].fileOwner
        );
    }

    /// @notice Returns details about all private files uploaded so far.
    /// @dev    Details returned are the one's stored in the blockchain on upload.
    /// @return ipfsCID of all private uploads.
    /// @return File name of all the private uploads.
    /// @return Address of the private uploader.
    function getAllPrivateUploads() public view onlyOwner
    returns(string[] memory,string[] memory, uint[] memory, address[] memory) {

        uint len = pKey.length;
        string [] memory ids = new string[](len);
        string [] memory names = new string[](len);
        uint [] memory date = new uint[](len);
        address [] memory owners = new address [](len);

        for (uint i = 0; i < pKey.length; ++i) {
            string memory key = pKey[i];
            ids[i] = privateCollection[key].ipfsCID;
            names[i] = privateCollection[key].fileName;
            date[i] = privateCollection[key].dateUploaded;
            owners[i] = privateCollection[key].fileOwner;
        }
        return(ids, names, date,owners);
    }
     
}