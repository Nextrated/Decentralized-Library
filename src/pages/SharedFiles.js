import React from 'react'
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

export default function SimilarFiles() {
  const fileType = "Shared"
  
  const files = [
    { 
      title: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      title: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      title: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      title: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      title: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      title: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
  ]

  return (
    <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">
        {
          files.map((file, index) => {
            return <FileCard 
                        key={index}
                        fileType={fileType} 
                        title={file.title}
                        uploadedAt={file.uploaded_at}
                        uploadedBy={file.uploaded_by}
                    />
          })
        }
    </Box>
  )
}
