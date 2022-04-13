import React from 'react'
import { Box, Image, Badge, Text } from "@chakra-ui/react"

export default function FileCard(props) {
  const { fileType, description, uploadedAt, uploadedBy } = props

  return (
    <Box border="1px solid gray" mx={{base:'auto', md:2}} mb={3} borderRadius="lg" w={{base:"80%", md:"40%", lg:"30%"}} overflow="hidden">
        <Image src="dp.png" alt="fileimg" h="180px" w="100%"/>
        <Box p={5} fontSize="md">
            <Badge colorScheme="teal" borderRadius="full">{fileType}</Badge>
            <Text>{description}</Text>
            <Text>Uploaded at: {uploadedAt}</Text>
            <Text>Uploaded by : {uploadedBy}</Text>
        </Box>

    </Box>
  )
}
