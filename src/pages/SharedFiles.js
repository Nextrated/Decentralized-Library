import React from 'react'
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

//import { getSharedFiles } from '../api';

export default function SimilarFiles({sharedFiles}) {
  // const fileType = "Shared"
  
  // const files = [
  //   { 
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  // ]

  return (
    <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">
        {
          sharedFiles.map((file, index) => {
            return <FileCard 
                        key={index}
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
