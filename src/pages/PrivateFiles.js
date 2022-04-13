import React from 'react'
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

export default function PrivateFiles() {
  const fileType = "Private"
  
  const files = [
    { 
      description: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      description: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      description: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      description: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      description: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
    { 
      description: "A sample text", 
      uploaded_at: "12:00 am", 
      uploaded_by: "Anonymous"
    },
  ]

  return (
    <Box d="flex" flexWrap="wrap" px={10} mt={5} mx="auto" justifyContent="space-around">
        {
          files.map((file, index) => {
            return <FileCard 
                        key={index}
                        fileType={fileType} 
                        description={file.description}
                        uploadedAt={file.uploaded_at}
                        uploadedBy={file.uploaded_by}
                    />
          })
        }
    </Box>
  )
}
