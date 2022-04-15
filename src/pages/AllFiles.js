import React from 'react';
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

export default function AllFiles({files}) {
  return (
    <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">       
        {
        files.map((file, index) => {
          return <FileCard 
                      key={index}
                      cid={file.cid}
                      title={file.name}
                      fileType={file.fileType} 
                      uploadedAt={file.time}
                      uploadedBy={file.author}
                  />
        })
      }
    </Box>
  )
}
