import { Box, Icon, Text, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Divider } from '@chakra-ui/react'
import React from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import {AiOutlineCloudDownload, AiFillEye } from "react-icons/ai";
import ShareForm from './ShareForm';

export default function FileCardActions({isPrivate, address, handleChange, loading, submitAddress}) {

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
                    <Box px={5} py={3}>
                        <Text d="flex" alignItems="center"><AiFillEye/>&nbsp; &nbsp; Preview</Text>
                    </Box>
                    <Divider/>
                    <Box px={5} py={3}>
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
