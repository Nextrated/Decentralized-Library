import { Box, Button, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import {GiHamburgerMenu} from "react-icons/gi";
import {AiOutlineWallet} from "react-icons/ai"

export default function Header({showSidebar , isConnected, currentAccount, toggleWallet}) {
    const bg = useColorModeValue("blackAlpha.100", "primaryLight");
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
        position="fixed" 
        d="flex" 
        justifyContent="space-between"
        zIndex="99"
    >
            <Box>
            
            <Text color={text} d="flex" alignItems="center"> <Icon as={GiHamburgerMenu} onClick={showSidebar} mr={3} cursor="pointer"/> MetaFiles </Text>
            </Box>
        
        <Box>
            <ColorModeSwitcher justifySelf="flex-end"/>
            <Button bg="purple" color="white" ml={5} onClick={toggleWallet}>
                {isConnected ? <> {truncate(currentAccount)}</> : <><AiOutlineWallet/> &nbsp; Connect Wallet</>}
            </Button>

        </Box>
    </Box>
  )
}
