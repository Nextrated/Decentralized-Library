/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import {
  Box,
  useDisclosure,
  //useColorModeValue,
} from '@chakra-ui/react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import SampleUpload from "./components/SampleUpload";
// import contractAddress from "./contracts/contract_address.json";
import "./App.css";
import Content from './pages/Content';

// require('dotenv').config()

function App() {
  const {isOpen, onOpen, onClose}= useDisclosure();
  const btnRef = useRef();
  // const bg = useColorModeValue("white", "primary");
  const [currentAccount, setCurrentAccount] = useState ('');
  const [isConnected, setIsConnected] = useState(false);
  const [showAll, setshowAll] = useState(true);
  const [showPublic, setshowPublic] = useState(false);
  const [showMyPublic, setshowMyPublic] = useState(false);
  const [showPrivate, setshowPrivate] = useState(false);
  const [showShared, setshowShared] = useState(false);
  const [showSearchPage, setShowSearchPage ] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState("");
  // const addr = contractAddress.contractAddress;
  
  // sets trhe current page to show searched files
  const setSearchPage = () => {
    setShowSearchPage(true)
    setshowPublic(false);
    setshowMyPublic(false);
    setshowPrivate(false);
    setshowShared(false);
    setshowAll(false);
  }

  // sets trhe current page to show all files
  const setAllPage = () => {
    setShowSearchPage(false)
    setshowPublic(false);
    setshowMyPublic(false);
    setshowPrivate(false);
    setshowShared(false);
    setshowAll(true);
  }

  // sets the current page to show shared files
  const setSharedPage = () => {
    setShowSearchPage(false)
    setshowPublic(false);
    setshowMyPublic(false);
    setshowPrivate(false);
    setshowShared(true);
    setshowAll(false);
  }

  // sets te current page to show private files
  const setPrivatePage = () => {
    setShowSearchPage(false)
    setshowPublic(false);
    setshowMyPublic(false);
    setshowPrivate(true);
    setshowShared(false);
    setshowAll(false);
  }

  // sets the current page to show public files
  const setPublicPage = () => {
    setshowPublic(true);
    setshowMyPublic(false);
    setshowPrivate(false);
    setshowShared(false);
    setshowAll(false);
    setShowSearchPage(false)
  }

  // sets the current page to show user's public files
  const setMyPublicPage = () => {
    setshowPublic(false);
    setshowMyPublic(true);
    setshowPrivate(false);
    setshowShared(false);
    setshowAll(false);
    setShowSearchPage(false)
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


  //reconnect and reload automatically on account change
  window.ethereum.on('accountsChanged', function (accounts) {
    connectWallet();
    
    window.location.reload()
  })  

  const updateNetwork =  async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log("ChainId", chainId)

    if(chainId === "0x4") {
      setCurrentNetwork("Rinkeby Test Network")
    } else if(chainId === "0x1") {
      setCurrentNetwork("You're on ETH Mainnet, please connect to the Rinkeby Test Network")
    } else if(chainId === "0x2a") {
      setCurrentNetwork("You're on the Kovan Test Network, please connect to the Rinkeby Test Network")
    }else if(chainId === "0x3") {
      setCurrentNetwork("You're on the Ropsten Test Network, please connect to the Rinkeby Test Network")
    }else if(chainId === "0x5") {
      setCurrentNetwork("You're on Goerli Test Network, please connect to the Rinkeby Test Network")
    } else {
      setCurrentNetwork("Check your network, Please connect to the Rinkeby Test Network")
    }

  }
  
  window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
  });  
  
  useEffect (() => {
    setIsConnected(false)
    checkIfWalletIsConnected ();
    updateNetwork();
  }, [])

  return (
      <Box textAlign="center" fontSize="xl">
        <Header 
          showSidebar={onOpen} 
          isConnected={isConnected} 
          currentAccount={currentAccount} 
          currentNetwork = {currentNetwork}
          toggleWallet={connectWallet}
        />
        <Sidebar 
          isOpen={isOpen} 
          onClose={onClose} 
          btnRef={btnRef} 
          setAllPage={setAllPage}
          setPrivatePage={setPrivatePage}
          setPublicPage={setPublicPage}
          setMyPublicPage={setMyPublicPage}
          setSharedPage= {setSharedPage}
        />
        <Content
            showAll={showAll}
            showPrivate={showPrivate}
            showPublic={showPublic}
            showMyPublic={showMyPublic}
            showShared={showShared}
            showSearchPage={showSearchPage}
            setSearchPage={setSearchPage}
            showAllFilesPage={setAllPage}
        />
      </Box>
  );
}

export default App;