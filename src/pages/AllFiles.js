import React from 'react';
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

export default function AllFiles() {
  return (
    <Box d="flex" flexWrap="wrap" px={10} mt={5} mx="auto" justifyContent="space-around">
        
        <FileCard/>
        <FileCard/>
        <FileCard/>
        <FileCard/>
        <FileCard/>
        <FileCard/>

    </Box>
  )
}
