import { Box, Icon, Text, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Divider } from '@chakra-ui/react'
import React from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import {AiOutlineCloudDownload, AiFillEye } from "react-icons/ai";
import ShareForm from './ShareForm';

import {create} from 'ipfs-http-client';

const client = create ('https://ipfs.infura.io:5001/api/v0');

export default function FileCardActions({isPrivate, address, cid, handleChange, loading, submitAddress}) {

    const download = async () => {
        console.log("Downloading... :", cid)
        const CID = "Qmd2EfsYeNPdfRXtkkXUqm5Eb1H1nQE77ptwdpLWX23TtQ"
        
        try {
            const r = await client.get(CID)
            const f = await client.files
            console.log("Result: ", r)

            // client.files.get(`http://ipfs.io/ipfs/${CID}`, function(files, err) {
            //     if (err) {
            //         console.log("Error: ", err)
            //         return
            //     }
                
            //     files.forEach((file) => {
            //         console.log("File: ",file)
            //         console.log("Content: ", file.content.toString('binary'))
            //     })
            // })
        } catch(error) {
            console.log("Error: ", error)
        }

        console.log("CID:", CID)
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
                    <Box px={5} py={3}>
                        <Text d="flex" alignItems="center"><AiFillEye/>&nbsp; &nbsp; Preview</Text>
                    </Box>
                    <Divider/>
                    <Box px={5} py={3} onClick={ () => download()}>
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
