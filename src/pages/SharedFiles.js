import React from 'react'
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

export default function SimilarFiles({sharedFiles}) {
  return (
    <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">
        {
          sharedFiles.map((file, index) => {
            return <FileCard 
                        key={index}
                        cid={file.cid}
                        fileType={file.fileType} 
                        title={file.title}
                        uploadedAt={file.time}
                        uploadedBy={file.author}
                    />
          })
        }
    </Box>
  )
}
