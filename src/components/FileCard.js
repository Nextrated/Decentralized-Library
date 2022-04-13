import React from 'react'
import { Box, Image, Badge, Text, useColorModeValue } from "@chakra-ui/react";
import FileCardActions from './FileCardActions';


export default function FileCard(props) {
  const bg = useColorModeValue("whitesmoke", "primaryLight");
  const { title,fileType, uploadedAt, uploadedBy } = props
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
            <Text color="gray.500" mr={3}>Uploaded by:</Text>
              <Text>{uploadedBy}</Text>
            </Box>
            <Box mt={3} cursor="pointer">
              <FileCardActions isPrivate={ fileType ==="Private" ? true : false}/>
            </Box>
        </Box>

    </Box>
  )
}
