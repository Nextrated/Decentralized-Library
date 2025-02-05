/* eslint-disable no-restricted-globals */
import React, { useRef, useState } from 'react';
import { ethers } from 'ethers';
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
  Text,
} from '@chakra-ui/react';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';

import abi from '../contracts/abi.json';
import contractAddress from '../contracts/contract_address.json';

const projectId = '2K8Hk2WXxV0wQQuj9EeB0u3Hn2U';
const projectSecret = 'fa53a3964c9a864007987a901ffafddc';

const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
      authorization: 
          'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
      }});
  

const Upload = ({reload, loading}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();
  const [fileName, setFileName] = useState('');
  const [type, setType] = useState('0');
  const [file, setFile] = useState(null);
  // const [fileDetails, setFileDetails] = useState('');
  // const [cid, setCid] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const captureFile = e => {
    const data = e.target.files[0];
    // setFileDetails(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };
  };
  const toast = useToast();

  const showErrorToast = message => {
    toast({
      title: 'Unsuccessful',
      description: message,
      status: 'error',
      duration: '5000',
      isClosable: true,
    });
  };

  const fileUpload = async x => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const fileUploadContract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        const fileUploadTxn = await fileUploadContract.fileUpload(
          x,
          fileName,
          type
        );
        await fileUploadTxn.wait();
        setSubmitted('Upload successful!');
        setIsSubmitted(false);

        setTimeout(() => {
          setSubmitted('');
          onClose();
          toast({
            title: 'Successfull',
            description: `File uploaded successfully`,
            status: 'success',
            duration: '5000',
            isClosable: true,
          });
          reload(!loading);
        }, 1000);
      } else {
        onClose();
        setIsSubmitted(false);
        setSubmitted('');
        showErrorToast('Please ensure you are connected to metamask');
        console.log('ethereum object does not exist!');
      }
    } catch (error) {
      onClose();
      setIsSubmitted(false);
      setSubmitted('');
      showErrorToast('An unexpected error occured');
      console.log(error);
    }
  };

  const submitUpload = async e => {
    const res = confirm(`Are you sure you want to upload this file as ${type==="0"? "public" :"private"} ?\n You won't be able to change this later`)
    if(res){
      e.preventDefault();
      setIsSubmitted(true);
  
      try {
        const created = await client.add(file);
        console.log('path', created.path);
        let cid = created.path;
        fileUpload(cid);
      } catch (error) {
        onClose();
        setIsSubmitted(false);
        setSubmitted('');
        showErrorToast('An unexpected error occured');
        console.log(error);
      }
    } else{
      return
    }
    
  };
  return (
    <div>
      <Button onClick={onOpen} bg="purple" color="white" ml={5}>
        Upload file
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload your file here</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form action="" onSubmit={submitUpload}>
              <FormLabel>Name of file</FormLabel>
              <Input
                type="text"
                placeholder="Enter name of file"
                required
                mb={4}
                onChange={e => setFileName(e.target.value)}
              />
              <Input type="file" required mb={4} onChange={captureFile} />
              <FormLabel as="view">View type</FormLabel>
              <RadioGroup defaultValue="0" mb={4}>
                <HStack spacing="24px">
                  <Radio value="0" onChange={e => setType(e.target.value)}>
                    Public
                  </Radio>
                  <Radio value="1" onChange={e => setType(e.target.value)}>
                    Private
                  </Radio>
                </HStack>
              </RadioGroup>
              <ModalFooter>
                <Text mr={2} color={'green.500'}>
                  {submitted}
                </Text>
                {isSubmitted === false ? (
                  <Button colorScheme="blue" mr={3} type="submit">
                    Submit
                  </Button>
                ) : (
                  <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    isLoading
                    loadingText="Submitting"
                  >
                    Submit
                  </Button>
                )}

                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Upload;
