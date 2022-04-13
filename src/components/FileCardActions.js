import { Box, Icon, Text, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Divider } from '@chakra-ui/react'
import React from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import {AiOutlineCloudDownload, AiFillEye, AiOutlineShareAlt} from "react-icons/ai";

export default function FileCardActions({isPrivate}) {
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
                    <Box px={5} py={3} d={isPrivate ? "block" : "none"}>
                        <Text d="flex" alignItems="center"><AiOutlineShareAlt mr={3}/>&nbsp; &nbsp; Share</Text>
                    </Box>
                    
                </PopoverBody>
            </PopoverContent>
        </Popover>
    </Box>
  )
}
