import React, {useRef, useState, useEffect} from 'react';
import {
  Box,
  Grid,
  useDisclosure,
  useColorModeValue,
  Text,
  Button
} from '@chakra-ui/react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AllFiles from './pages/AllFiles';
import PublicFiles from "./pages/PublicFiles";
import PrivateFiles from "./pages/PrivateFiles";
import SharedFiles from "./pages/SharedFiles";

function App() {
  const {isOpen, onOpen, onClose}= useDisclosure();
  const btnRef = useRef();
  const bg = useColorModeValue("white", "primary");
  const [currentAccount, setCurrentAccount] = useState ('');
  const [isConnected, setIsConnected] = useState(false);
  const [showAll, setshowAll] = useState(true);
  const [showPublic, setshowPublic] = useState(false);
  const [showPrivate, setshowPrivate] = useState(false);
  const [showShared, setshowShared] = useState(false);

  const setAllPage = () => {
    setshowPublic(false);
    setshowPrivate(false);
    setshowShared(false);
    setshowAll(true);
  }

  const setSharedPage = () => {
    setshowPublic(false);
    setshowPrivate(false);
    setshowShared(true);
    setshowAll(false);
  }

  const setPrivatePage = () => {
    setshowPublic(false);
    setshowPrivate(true);
    setshowShared(false);
    setshowAll(false);
  }

  const setPublicPage = () => {
    setshowPublic(true);
    setshowPrivate(false);
    setshowShared(false);
    setshowAll(false);
  }
   
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

    useEffect (() => {
      setIsConnected(false)
      checkIfWalletIsConnected ();
    }, [])

  return (
      <Box textAlign="center" fontSize="xl" bg={bg}>
        <Header 
          showSidebar={onOpen} 
          isConnected={isConnected} 
          currentAccount={currentAccount} 
          toggleWallet={connectWallet}
        />
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

            <Button bg="purple" color="white" ml={5}>
                Upload file
            </Button>
          </Box>
          {showAll ? <AllFiles /> : null}
          {showPrivate ? <PrivateFiles /> : null}
          {showPublic ? <PublicFiles /> : null}
          {showShared ? <SharedFiles /> : null}
        </Grid>
      </Box>
  );
}

export default App;
