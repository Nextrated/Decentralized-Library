import { Box, Button, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import {GiHamburgerMenu} from "react-icons/gi";
import {AiOutlineWallet} from "react-icons/ai"

export default function Header({showSidebar , isConnected, currentAccount, toggleWallet, currentNetwork}) {
    const bg = useColorModeValue("whitesmoke", "primaryLight");
    const text = useColorModeValue("black", "white");

    //truncate wallet address
    function truncate(input) {
        return input.substring(0, 5) + '...' + input.substring(38);
  };
   
  return (
    <Box 
        p={5} 
        w="100vw" 
        bg={bg} 
        d="flex" 
        justifyContent="space-between"
        alignItems="center"
        zIndex="99"
        h="70px"
    >
            <Box float="left">
            
            <Text color={text} > <Icon as={GiHamburgerMenu} onClick={showSidebar} mr={3} cursor="pointer"/> MetaFiles </Text>
            </Box>
        
        <Box d="flex" justifyContent="space-around" pr={5}>
            <Box d="flex" >
            <ColorModeSwitcher float="right" justifySelf="flex-end"/>
                 <Button float="right" bg="purple" color="white" ml={5} onClick={toggleWallet} mb={2}>
                     {isConnected ? <> {truncate(currentAccount)}</> : <><AiOutlineWallet/> &nbsp; Connect Wallet</>}
                 </Button>
                 <sub style={{color:"orange",fontSize:"10px", fontWeight:"bold", textAlign:'center'}}>{currentNetwork}</sub>
            </Box>
            {/* <Button bg="purple" color="white" ml={5} >
               {currentNetwork}
            </Button>
            <Button bg="purple" color="white" ml={5} onClick={toggleWallet}>
                {isConnected ? <> {truncate(currentAccount)}</> : <><AiOutlineWallet/> &nbsp; Connect Wallet</>}
            </Button> */}

        </Box>
    </Box>
  )
}
