import React from 'react';
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

export default function AllFiles() {
  return (
    <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">
        
        <FileCard/>
        <FileCard/>
        <FileCard/>
        <FileCard/>
        <FileCard/>
        <FileCard/>

    </Box>
  )
}
