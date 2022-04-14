/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import {
  Box,
  Grid,
  useDisclosure,
  //useColorModeValue,
  Text
} from '@chakra-ui/react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AllFiles from './pages/AllFiles';
import PublicFiles from "./pages/PublicFiles";
import PrivateFiles from "./pages/PrivateFiles";
import SharedFiles from "./pages/SharedFiles";
import Upload from './components/Upload';
// import SampleUpload from "./components/SampleUpload";
import contractAddress from "./contracts/contract_address.json";
import "./App.css";

import { fetchPublicFiles, fetchPrivateFiles, fetchSharedFiles } from "./api"

function App() {
  const {isOpen, onOpen, onClose}= useDisclosure();
  const btnRef = useRef();
  // const bg = useColorModeValue("white", "primary");
  const [currentAccount, setCurrentAccount] = useState ('');
  const [isConnected, setIsConnected] = useState(false);
  const [showAll, setshowAll] = useState(true);
  const [showPublic, setshowPublic] = useState(false);
  const [showPrivate, setshowPrivate] = useState(false);
  const [showShared, setshowShared] = useState(false);
  const addr = contractAddress.contractAddress;
  const [ publicFiles, setPublicFiles ] = useState([]);
  const [ privateFiles, setPrivateFiles ] = useState([]);
  const [ sharedFiles, setSharedFiles ] = useState([]);
  const [ allFiles, setAllFiles ] = useState([]);

  // sets trhe current page to show all files
  const setAllPage = () => {
    setshowPublic(false);
    setshowPrivate(false);
    setshowShared(false);
    setshowAll(true);
  }

  // sets the current page to show shared files
  const setSharedPage = () => {
    setshowPublic(false);
    setshowPrivate(false);
    setshowShared(true);
    setshowAll(false);
  }

  // sets te current page to show private files
  const setPrivatePage = () => {
    setshowPublic(false);
    setshowPrivate(true);
    setshowShared(false);
    setshowAll(false);
  }

  // sets the current page to show public files
  const setPublicPage = () => {
    setshowPublic(true);
    setshowPrivate(false);
    setshowShared(false);
    setshowAll(false);
  }
   
  // checks if a wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        alert("Please install metamask extension");
        window.open("https://metamask.io/download/", "_blank");
      } else {
        console.log ('found one', ethereum);
      }
      /*
      * Check if we're authorized to access the user's wallet
      */

      const accounts = await ethereum.request ({method: 'eth_accounts'});
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log ('account ', account);
        setCurrentAccount (account);
        setIsConnected(true);
      } else {
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log (error);
    }
  };
  
    
  //connect wallet with button click
  const connectWallet = async() => {
    if(!isConnected) {
      try {
        const {ethereum} = window;
        if (!ethereum) {
          alert("Please install metamask");
          window.open("https://metamask.io/download/", "_blank");
          return;
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
        setIsConnected(true);
       } catch (error) {
         console.log(error)
       }
    } else{
      setCurrentAccount("");
      setIsConnected(false)
    }
  } 

  //function to get all public files
  const getPublicFiles = async () => {
    const files = await fetchPublicFiles(window.ethereum)
    setPublicFiles(files)
  }

  //function to get all private files
  const getPrivateFiles = async () => {
    const files = await fetchPrivateFiles(window.ethereum)
    setPrivateFiles(files)
  }

  //function to get all shared files
  const getSharedFiles = async () => {
    const files = await fetchSharedFiles(window.ethereum)
    setSharedFiles(files)
  }

  useEffect(() => {
    var newArr = publicFiles.concat(privateFiles, sharedFiles);
    setAllFiles(newArr);
  }, [publicFiles, privateFiles, sharedFiles])
  
  useEffect (() => {
    setIsConnected(false)
    checkIfWalletIsConnected ();
    async function fetchFiles(){
      await getPublicFiles();
      await getPrivateFiles();
      await getSharedFiles();
    }
    fetchFiles();
  }, [])

  return (
      <Box textAlign="center" fontSize="xl">
        <Header 
          showSidebar={onOpen} 
          isConnected={isConnected} 
          currentAccount={currentAccount} 
          toggleWallet={connectWallet}
        />
        {console.log(privateFiles)}
        {console.log(sharedFiles)}
        <Sidebar 
          isOpen={isOpen} 
          onClose={onClose} 
          btnRef={btnRef} 
          setAllPage={setAllPage}
          setPrivatePage={setPrivatePage}
          setPublicPage={setPublicPage}
          setSharedPage= {setSharedPage}
        />
        <Grid minH="100vh" p={3}>
          <Box mt="100px" d="flex" justifyContent="space-between" px={10}>
            <Text fontSize={{base:"xl", md:"2xl", lg:"3xl"}} fontWeight="700">
              {showAll ? "All files" : null}
              {showShared ? "Shared with me" : null}
              {showPublic ? "Public files" : null}
              {showPrivate ? "Private files" : null}
            </Text>
            {/* <SampleUpload/> */}
             <Upload />
          </Box>
          {showAll ? <AllFiles files={allFiles}/> : null}
          {showPrivate ? <PrivateFiles privateFiles={privateFiles}/> : null}
          {showPublic ? <PublicFiles publicFiles={publicFiles}/> : null}
          {showShared ? <SharedFiles sharedFiles={sharedFiles}/> : null}
        </Grid>
      </Box>
  );
}

export default App;