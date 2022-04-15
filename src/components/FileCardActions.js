import { Box, Icon, Text, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Divider } from '@chakra-ui/react'
import React from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import {AiOutlineCloudDownload, AiFillEye } from "react-icons/ai";
import ShareForm from './ShareForm';

import fileDownload from 'js-file-download'
import {create} from 'ipfs-http-client';


const client = create ('https://ipfs.infura.io:5001/api/v0');

export default function FileCardActions({isPrivate, address, cid, handleChange, loading, submitAddress}) {
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
                <Icon as={FiMoreHorizontal}  position="relative" />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverCloseButton/>
                <PopoverBody>
                    {/* <Divider/> */}
                    <Box px={5} py={3} onClick={ preview }>
                        <Text d="flex" alignItems="center"><AiFillEye/>&nbsp; &nbsp; Preview</Text>
                    </Box>
                    <Divider/>
                    <Box px={5} py={3}>
                        <Text d="flex" alignItems="center"><AiOutlineCloudDownload/>&nbsp; &nbsp; <a href={url} download> Download </a></Text>
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
