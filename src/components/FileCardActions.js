import { Box, 
    Icon, 
    Text, 
    useColorModeValue, 
    Popover, 
    PopoverBody, 
    PopoverCloseButton, 
    PopoverContent, 
    PopoverTrigger, 
    useToast,
    Divider } from '@chakra-ui/react'
import React from 'react';
import { CgOptions } from "react-icons/cg";
import {AiOutlineCloudDownload, AiFillEye } from "react-icons/ai";
import ShareForm from './ShareForm';
import fileDownload from 'js-file-download';
import {AiOutlineShareAlt} from "react-icons/ai";

export default function FileCardActions({isPrivate,isPublic, address, cid, handleChange, loading, submitAddress}) {
    const bg = useColorModeValue("blackAlpha.100", "primaryLight");
    const toast = useToast();
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

    const webShare = async () => {
        const data = {
            title:"MetaFiles",
            text:"File shared from metafiles decentralized library",
            url:url
        }
        try{
            await navigator.share(data);
            toast({
                title: 'Successfull',
                description: `File shared successfully`,
                status: 'success',
                duration: '5000',
                isClosable: true,
              });
        } catch(e){
            toast({
                title: 'Error!',
                description: e,
                status: 'error',
                duration: '5000',
                isClosable: true,
              });
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
                    <Divider d={isPublic ? "block":"none"}/>
                    <Box d={isPublic ? "block":"none"} px={5} py={3} onClick={ () => webShare()} _hover={{bg:bg}}>
                        <Text d="flex" alignItems="center"><AiOutlineShareAlt mr={3}/>&nbsp; &nbsp; Share link</Text>
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
