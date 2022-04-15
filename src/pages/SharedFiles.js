import React from 'react'
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

import { sortFiles } from '../utils';

export default function SharedFiles({sharedFiles}) {
  sharedFiles = sortFiles(sharedFiles)

  return (
    <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">
        {
          sharedFiles?.map((file, index) => {
            return <FileCard 
                        key={index}
                        fileType={file.fileType} 
                        title={file.name}
                        uploadedAt={file.time}
                        uploadedBy={file.author}
                        cid={file.cid}
                    />
          })
        }
    </Box>
  )
}
