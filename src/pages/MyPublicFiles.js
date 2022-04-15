import React from 'react'
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

import { sortFiles } from '../utils';

export default function MyPublicFiles({myPublicFiles}) {
  myPublicFiles = sortFiles(myPublicFiles)

  return (
    <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">
        {
          myPublicFiles?.map((file, index) => {
            return <FileCard 
                        key={index}
                        title={file.name}
                        fileType={file.fileType} 
                        uploadedAt={file.time}
                        uploadedBy={file.author}
                        cid={file.cid}
                    />
          })
        }
    </Box>
  )
}