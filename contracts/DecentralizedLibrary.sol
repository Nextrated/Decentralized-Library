// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

/// @title A decentralized library
/// @author Team Ace [Blockgames] - Anyanwu Maureen, Johnmicheal, Phyf3, Chidera, Pearl, JNIC
/// @notice You can use this to contract store files in a decentralized and distributed system 
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This contract is a PoC.
contract DecentralizedLibrary { 

    address public owner;
    mapping (string => FileDetail) public collection; 
    string[] public keys;

    mapping (address => mapping(string => FileDetail)) public privateCollection;
    string[] private pKey;


    mapping (string => bool) public fileExists;
   
    /// @notice Structs of all the file details.
    struct FileDetail { 
        string ipfsCID; 
        string fileName; 
        uint timeUploaded; 
        address fileOwner;
    } 

    // FileDetail[] public fileDetailsArray;

    event FileUploaded(string ipfsCID, string fileName, uint timeUploaded , address fileOwner); 



    /// @notice Makes sure the current address is the only owner -> for private files functions
    constructor(){
        owner = msg.sender;
    }

    /// @notice Makes sure the current address is the only owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only current address can do this");
        _;
    }


    /// @notice Upload files to a public dashboard.
    /// @param  _ipfsCID The CID hash of the file uploaded to ipfs/any decentralised storage
    /// @param  _fileName The file name of the file
    /// @param _uploadType its either 0 for public and 1 for private
    /// @dev    The params are stored on the blockchain on function call, lookups can be done 
    function fileUpload(string memory _ipfsCID, string memory _fileName, uint _uploadType) 
    public { 
        require(fileExists[_ipfsCID] == false, "File with this CID already exists.");
        require(fileExists[_fileName] == false, "File with this Name already exists, Rename.");

        //initialising our struct with data
        FileDetail memory fileDetails = FileDetail(_ipfsCID, _fileName, block.timestamp, msg.sender); 

        //check uploadType
        if (_uploadType == 1) {
            privateCollection[msg.sender][_fileName] = fileDetails;
            pKey.push(_fileName);
        } else {
            collection[_ipfsCID] = fileDetails;
            keys.push(_ipfsCID); 
        }
        
        // set fileExist to true
        fileExists[_fileName] = true;
        fileExists[_ipfsCID] = true;

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
            collection[key].timeUploaded,
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
            time[i] = collection[key].timeUploaded;
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
            collection[_ipfsCID].timeUploaded, 
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
            collection[_fileName].timeUploaded,
            collection[_fileName].fileOwner, 
            collection[_fileName].exist 
        ); 
    }
         */
    
    

    /// @notice Returns the total number of files uploaded.
    /// @dev    Returns only a fixed number that's the fixed length of the keys array from the iterable mapping.
    /// @return Length in unsigned integer
    function getSizeOfPrivateUploads() external view returns(uint) {
        return pKey.length;
    }


    /// @notice Returns details about the last private file uploaded.
    /// @dev    Details returned are the one's stored in the blockchain on upload.
    /// @return ipfsCID of last private upload.
    /// @return File name of the last private upload.
    /// @return Date the private file got uploaded 
    /// @return Address of the private uploader.
    function getLatestPrivateUpload() external view 
    returns ( string memory, string memory, uint, address) {
        uint len = pKey.length;
        string memory key = pKey[len - 1];
        return (
            privateCollection[msg.sender][key].ipfsCID,
            privateCollection[msg.sender][key].fileName,
            privateCollection[msg.sender][key].timeUploaded,
            privateCollection[msg.sender][key].fileOwner
        );
    }

    /// @notice Returns details about all private files uploaded so far.
    /// @dev    Details returned are the one's stored in the blockchain on upload.
    /// @return ipfsCID of all private uploads.
    /// @return File name of all the private uploads.
    /// @return Address of the private uploader.
    function getAllPrivateUploads() public view
    returns(string[] memory,string[] memory, uint[] memory, address[] memory) {

        uint len = pKey.length;
        string [] memory ids = new string[](len);
        string [] memory names = new string[](len);
        uint [] memory time = new uint[](len);
        address [] memory owners = new address [](len);

        for (uint i = 0; i < pKey.length; ++i) {
            string memory key = pKey[i];
            ids[i] = privateCollection[msg.sender][key].ipfsCID;
            names[i] = privateCollection[msg.sender][key].fileName;
            time[i] = privateCollection[msg.sender][key].timeUploaded;
            owners[i] = privateCollection[msg.sender][key].fileOwner;
        }
        return(ids, names, time, owners);
    }

    /// @notice Returns details about a specific file uploaded by msg.sender.
    /// @param _fileName unique name of the file to be fetched
    /// @return _ipfsCID file CID.
    /// @return _filename file name.
    /// @return _timeUploaded upload date of file
    /// @return _fileOwner address of file uploader.
    function getOnePrivateFile(string memory _fileName) public view 
    returns (string memory _ipfsCID, string memory _filename, uint _timeUploaded, address _fileOwner) {
        require(fileExists[_fileName] == true, "File does not exist");
        _ipfsCID = privateCollection[msg.sender][_fileName].ipfsCID;
        _filename = privateCollection[msg.sender][_fileName].fileName;
        _timeUploaded = privateCollection[msg.sender][_fileName].timeUploaded;
        _fileOwner = privateCollection[msg.sender][_fileName].fileOwner;
    }

    /// @notice Shares a fileDetail struct with another address.
    /// @param _to intended address to receive file.
    /// @param _fileName unique name of file to be shared.
    function sharePrivateFile(address _to, string memory _fileName) external {
        require(fileExists[_fileName] == true, "File does not exist");
        (string memory _ipfsCID, string memory _filename,
        uint _timeUploaded, address _fileOwner)  = getOnePrivateFile(_fileName);
        require(_fileOwner == msg.sender, "FIle share not authorized. Not Owner");
        FileDetail memory fileDetails = FileDetail(_ipfsCID, _filename , _timeUploaded, _fileOwner);
        privateCollection[_to][_fileName] = fileDetails;
    }
     
}