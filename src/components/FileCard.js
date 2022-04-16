import React, { useState } from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import FileCardActions from './FileCardActions';
import {MdSubtitles } from "react-icons/md";
import {FaSlackHash} from "react-icons/fa";
import {AiOutlineClockCircle} from "react-icons/ai";
import { VscAccount } from "react-icons/vsc"

import { shareFile } from '../api';

export default function FileCard(props) {
  const bg = useColorModeValue('whitesmoke', 'primaryLight');
  const { title, fileType, uploadedAt, uploadedBy, cid } = props;
  const [address, setAddress] = useState('');
  const [loading, setloading] = useState(false);
  const toast = useToast();

  const handleChange = () => {
    const val = document.getElementById('share').value;
    setAddress(val);
  };

  const submitAddress = async () => {
    setloading(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        await shareFile(ethereum, address, title);
        setloading(false);
        toast({
          title: 'Successfull',
          description: `${address} now has access to this file`,
          status: 'success',
          duration: '5000',
          isClosable: true,
        });
      } else {
        console.log('ethereum object does not exist!');
        setloading(false);
        toast({
          title: 'Unsuccessful',
          description: 'Please ensure you are connected to metamask',
          status: 'error',
          duration: '5000',
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      toast({
        title: 'Unsuccessful',
        description: 'An unexpected error occured',
        status: 'error',
        duration: '5000',
        isClosable: true,
      });
    }
  };

  // const imgs = ["file1.png", "file2.png", "file3.png"]

  // const random = (arr) => {
  //   return arr[Math.floor(Math.random() * arr.length)];
  // }

  const getImg = (x) => {
    if(x ==="Public"){
      return "file1.png"
    } else if(x === "Private"){
      return "file6.png"
    } else{
      return "file5.png"
    }
  }

  // useEffect(() => {
  //   retrieve(cid)
  // }, [])

  return (
    <Box
      mx={{ base: 'auto', md: 2 }}
      mb={5}
      borderRadius="lg"
      minW={{base:"100%", md:"350px"}}
      w={{ base: '100%', md: '45%', lg: '30%' }}
      wordBreak="break-word"
      // h={{base: "75%"}}
      overflow="hidden"
      bg={bg}
      boxShadow="lg"
      cursor="pointer"
    >
      <Image
        src={getImg(fileType)}
        //src={`https://ipfs.io/ipfs/${cid}` || "file3.png"} 
        alt="fileimg"
        h="180px"
        w="100%"
        fit="contain"
        onClick={() => window.open(`https://ipfs.io/ipfs/${cid}`, '_blank')}
      />
      <Box px={5} pt={5} fontSize="xs" fontWeight="700" textAlign="left">
        {fileType === 'Public' ? (
          <Badge colorScheme="teal" borderRadius="full" mb={3}>
            Public
          </Badge>
        ) : null}
        {fileType === 'Private' ? (
          <Badge colorScheme="red" borderRadius="full" mb={3}>
            Private
          </Badge>
        ) : null}
        {fileType === 'Shared' ? (
          <Badge colorScheme="orange" borderRadius="full" mb={3}>
            Shared
          </Badge>
        ) : null}
        <Box d="flex">
          <Text color="gray.500" mr={3}>
            <MdSubtitles/> &nbsp;
          </Text>
          <Text textTransform="capitalize" mt="-3px">{title}</Text>
        </Box>
        <Box d="flex">
          <Text color="gray.500" mr={3}>
            <AiOutlineClockCircle/> &nbsp;
          </Text>
          <Text mt="-3px">{uploadedAt}</Text>
        </Box>
        <Box d="flex">
          <Text color="gray.500" mr={3}>
            <FaSlackHash/> &nbsp;
          </Text>
          <Text mt="-5px">{cid}</Text>
        </Box>
        {fileType === "Shared" ? <Box d="flex">
          <Text color="gray.500" mr={3}>
            <VscAccount /> &nbsp;
          </Text>
          <Text mt="-3px">{uploadedBy}</Text>
        </Box>: null}

        <Box mt={3} cursor="pointer">
          <FileCardActions
            isPrivate={fileType === 'Private' ? true : false}
            address={address}
            cid={cid}
            handleChange={handleChange}
            loading={loading}
            submitAddress={submitAddress}
          />
        </Box>
      </Box>
    </Box>
  );
}
