pragma solidity ^0.8.4;


contract DecntralizedLibrary { 
    address public owner;
    mapping (string => FileDetails) public collection; 
    mapping(string => bool) public uploaded;
    string[] public keys;
   

    struct FileDetails { 
        string ipfsCID; 
        string fileName; 
        string fileType; 
        uint dateUploaded; 
        bool exist;  
    } 

    event FileUploaded(string ipfsCID, string fileName, string fileType, uint dateUploaded); 

    constructor () { 
        owner = msg.sender; 
    } 

    function fileUpload(string memory _ipfsCID, string memory _fileName, string memory _fileType, uint _dateUploaded) public { 
        require(collection[_ipfsCID].exist == false, "File with this CID already exists."); 
        require(collection[_fileName].exist == false, "File with this Name already exists, Rename.");

        //initialising our struct with data
        FileDetails memory fileDetails = FileDetails(_ipfsCID, _fileName, _fileType, _dateUploaded, true); 

        //setting up ways to get data with these methods
        
        collection[_ipfsCID] = fileDetails; 
        collection[_fileName] = fileDetails;


        if(!uploaded[_fileName]) {
            uploaded[_fileName] = true;
            keys.push(_fileName);
        }

        emit FileUploaded(_ipfsCID, _fileName, _fileType, _dateUploaded);
    } 
}