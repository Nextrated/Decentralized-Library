import React, { useState} from 'react';
import { ethers } from "ethers";
import {
  useDisclosure,
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  ModalFooter,
  useToast,
  Box
} from '@chakra-ui/react';
//import {Buffer} from 'buffer'
//import {create} from 'ipfs-http-client'
import contractAddress from "../contracts/contract_address.json";
import { storeFiles } from "../api/store.js";

// import "dot-env/config";

import abi from '../contracts/abi.json'

// const client = create('https://ipfs.infura.io:5001/api/v0')

const SampleUpload = () => {
  const {isOpen, onOpen, onClose} = useDisclosure ();
  const [fileName, setFileName] = useState('')
  const [type, setType] = useState("0")
  const [file, setFile] = useState(null)
  // const [cid, setCid] = useState('')
  const [submitting, setSubmitting] = useState(false);

  const toast = useToast();
  const addr = contractAddress.contractAddress

  const captureFile = (e) => {
      setFile(e.target.files);
  
  }

  const fileUpload = async (hash) => {
    try {
        const {ethereum} = window
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const fileUploadContract = new ethers.Contract(addr, abi.abi, signer)
            const fileUploadTxn = await fileUploadContract.fileUpload(hash, fileName, type)
            await fileUploadTxn.wait()
          setSubmitting(false)
          toast({
            title:"Successfull",
            description:"Your file has successfully been added to MetaFiles",
            status:"success",
            duration:"5000",
            isClosable:true
          })

        }else{
            console.log('ethereum object does not exist!');
            setSubmitting(false);
            toast({
              title:"Unsuccessful",
              description:"Please ensure you are connected to metamask",
              status:"error",
              duration:"5000",
              isClosable:true
            })
  
        }
    } catch (error) {
        console.log(error)
        setSubmitting(false);
        toast({
          title:"Unsuccessful",
          description:"An unexpected error occured",
          status:"error",
          duration:"5000",
          isClosable:true
        })
    }
}

const resetForm = ()=> {
    setFileName("");
    setType("0")
    onClose()
    
}

  const submitUpload = async () => {
      setSubmitting(true)
      try {
       const res = await storeFiles(file, fileName)
       await fileUpload(res);
       resetForm()


      } catch (error) {
        console.log(error)
        resetForm()
      }


  }
  return (
    <div>
      <Button onClick={onOpen} bg="purple" color="white" ml={5}>

        Upload file
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>
            Upload your file here
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>
              <FormLabel>Name of file</FormLabel>
              <Input
                type="text"
                placeholder="Enter name of file"
                required
                mb={4}
                value={fileName}
                onChange={e => setFileName(e.target.value)}
              />
              <Input type="file" required mb={4} onChange={captureFile}/>
              <FormLabel as="view">View type</FormLabel>
              <RadioGroup value={type} mb={4} >
                <HStack spacing="24px">
                  <Radio value="0" onChange={e => setType(e.target.value)}>Public</Radio>
                  <Radio value="1" onChange={e => setType(e.target.value)}>Private</Radio>
                </HStack>
              </RadioGroup>
              <ModalFooter>
                
                <Button 
                    colorScheme="blue" 
                    mr={3} 
                    onClick={submitUpload}
                    isLoading={submitting ? true : false}>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  );
};

export default SampleUpload;
