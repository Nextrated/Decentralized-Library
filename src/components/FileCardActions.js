import { Box, Icon, Text, useColorModeValue, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Divider } from '@chakra-ui/react'
import React from 'react';
import { CgOptions } from "react-icons/cg";
import {AiOutlineCloudDownload, AiFillEye } from "react-icons/ai";
import ShareForm from './ShareForm';
import fileDownload from 'js-file-download'

export default function FileCardActions({isPrivate, address, cid, handleChange, loading, submitAddress}) {
    const bg = useColorModeValue("blackAlpha.100", "primaryLight");

    const url = "https://ipfs.infura.io/ipfs/" + cid

    const preview = () => {
        try {
            window.open(url, '_blank')
        } catch(error) {
            console.log("Error: ", error)
        }
    }

    const download = async () => {
        try {
            console.log("Hello")
            const file = await fetch(url)
            console.log("File: ", file)
            fileDownload(file.body, cid)
        } catch(error) {
            console.log("Error: ", error)
        }
    }
    
  return (
    <Box>
        <Popover placement="right">
            <PopoverTrigger>
                <Icon as={CgOptions}  position="relative"  w={6} h={6}/>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverCloseButton/>
                <PopoverBody>
                    {/* <Divider/> */}
                    <Box px={5} py={3} onClick={ preview } _hover={{bg:bg}}>
                        <Text d="flex" alignItems="center"><AiFillEye/>&nbsp; &nbsp; Preview</Text>
                    </Box>
                    <Divider/>
                    <Box px={5} py={3} onClick={ () => download()} _hover={{bg:bg}}>
                        <Text d="flex" alignItems="center"><AiOutlineCloudDownload/>&nbsp; &nbsp; Download</Text>
                    </Box>
                    <Divider d={isPrivate ? "block" : "none"}/>
                    <ShareForm
                        isPrivate={isPrivate}
                        address={address}
                        handleChange={handleChange}
                        loading={loading}
                        submitAddress={submitAddress}
                    />
                    
                </PopoverBody>
            </PopoverContent>
        </Popover>
    </Box>
  )
}
