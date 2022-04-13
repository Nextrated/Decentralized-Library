import React from 'react'
import { Box, Image, Badge, Text, useColorModeValue } from "@chakra-ui/react";
import FileCardActions from './FileCardActions';


export default function FileCard() {
  const bg = useColorModeValue("whitesmoke", "primaryLight");
  return (
    <Box 
      mx={{base:'auto', md:2}} 
      mb={5} 
      borderRadius="lg" 
      w={{base:"100%", md:"45%", lg:"30%"}} 
      overflow="hidden"
      bg={bg}
      boxShadow="lg"
    >
        <Image src="dp.png" alt="fileimg" h="180px" w="100%"/>
        <Box p={5} fontSize="sm" fontWeight="700" textAlign="left">
            <Badge colorScheme="teal" borderRadius="full" mb={3}>Public</Badge>
            <Box d="flex" >
              <Text color="gray.500" mr={3}>Title:</Text>
              <Text>A sample Text</Text>
            </Box>
            <Box d="flex">
            <Text color="gray.500" mr={3}>Uploaded at:</Text>
              <Text>12:00am</Text>
            </Box>
            <Box d="flex">
            <Text color="gray.500" mr={3}>Uploaded by:</Text>
              <Text>0xagdgydftyfwgg72i6rgsdvcsgtf</Text>
            </Box>
            <Box mt={3} px={5} cursor="pointer">
              <FileCardActions />
            </Box>
        </Box>

    </Box>
  )
}
