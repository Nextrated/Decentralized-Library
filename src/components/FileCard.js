import React, { useState} from 'react'
import { Box, Image, Badge, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import FileCardActions from './FileCardActions';
import contractAddress from "../contracts/contract_address.json";

import { shareFile } from '../api';


export default function FileCard(props) {
  const bg = useColorModeValue("whitesmoke", "primaryLight");
  const { cid, title, fileType, uploadedAt, uploadedBy } = props;
  const [address, setAddress] = useState("")
  const [loading, setloading] = useState(false)
  const addr = contractAddress.contractAddress;
  const toast = useToast();

  const handleChange = () => {
    const val = document.getElementById("share").value
    setAddress(val)
  }

  const submitAddress= async() => {
    setloading(true)
      try {
          const {ethereum} = window
          if(ethereum) {
            await shareFile(ethereum, address, title)
            setloading(false)
            toast({
              title:"Successfull",
              description:`${address} now has access to this file`,
              status:"success",
              duration:"5000",
              isClosable:true
            })
  
          }else{
              console.log('ethereum object does not exist!');
              setloading(false);
              toast({
                title:"Unsuccessful",
                description:"Please ensure you are connected to metamask",
                status:"error",
                duration:"5000",
                isClosable:true
              })
    
          }
      } catch (error) {
          console.log(error)
          setloading(false);
          toast({
            title:"Unsuccessful",
            description:"An unexpected error occured",
            status:"error",
            duration:"5000",
            isClosable:true
          })
      }
  }
  return (
    <Box 
      mx={{base:'auto', md:2}} 
      mb={5} 
      borderRadius="lg" 
      minW={{base:"100%", md:"45%", lg:"30%"}} 
      // h={{base: "75%"}}
      overflow="hidden"
      bg={bg}
      boxShadow="lg"
      // minWidth={"300px"}
    >
        <Image src="dp.png" alt="fileimg" h="180px" w="100%"/>
        <Box px={5} pt={5} fontSize="sm" fontWeight="700" textAlign="left">
          {fileType==="Public" ? <Badge colorScheme="teal" borderRadius="full" mb={3}>Public</Badge>: null}
          {fileType==="Private" ? <Badge colorScheme="red" borderRadius="full" mb={3}>Private</Badge>: null} 
          {fileType==="Shared" ? <Badge colorScheme="orange" borderRadius="full" mb={3}>Shared</Badge>: null}
            <Box d="flex" >
              <Text color="gray.500" mr={3}>Title:</Text>
              <Text>{title}</Text>
            </Box>
            <Box d="flex">
            <Text color="gray.500" mr={3}>Uploaded at:</Text>
              <Text>{uploadedAt}</Text>
            </Box>
            <Box d="flex">
            <Text color="gray.500" mr={3}>By:</Text>
              <Text>{uploadedBy}</Text>
            </Box>
            <Box mt={3} cursor="pointer">
              <FileCardActions 
                isPrivate={ fileType === "Private" ? true : false} 
                address={address}
                cid={cid}
                handleChange={handleChange}
                loading={loading}
                submitAddress={submitAddress}
              />
            </Box>
        </Box>

    </Box>
  )
}
