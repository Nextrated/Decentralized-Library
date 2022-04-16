import React from 'react';
import { Box, Button, Text } from "@chakra-ui/react"
import FileCard from '../components/FileCard';
 
export default function SearchFiles({files, showAll}) {

  return (
      <>
      <Box d="flex" justifyContent="space-between" alignItems="center" pl={{base:5 , md:10, lg:12 }} mt={5}>
        <Button bg="purple" w="auto" onClick={showAll} variant="outline" >
            Back to all files
        </Button>
        <Text>{files?.length>0 ? files.length : "No"} file(s) found</Text>
      </Box>
        {/* <Button bg="purple" w="auto" onClick={showAll} variant="outline" pl={{base:5 , md:10, lg:12 }} mt={5}>
            Back to all files
        </Button> */}
        <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">       
            {files.map((file, index) => {
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
      </>

  )
}
