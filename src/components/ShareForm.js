import React from 'react';
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
    ModalFooter,
    Box,
    Text
  } from '@chakra-ui/react';
  import {AiOutlineShareAlt} from "react-icons/ai";

export default function ShareForm({isPrivate, address, handleChange, loading, submitAddress}) {
    const {isOpen, onOpen, onClose} = useDisclosure ();
  return (
    <div>
      <Box px={5} py={3} d={isPrivate ? "block" : "none"} onClick={onOpen}>
            <Text d="flex" alignItems="center"><AiOutlineShareAlt mr={3}/>&nbsp; &nbsp; Share</Text>
        </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>
            Share your file
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter address"
                required
                mb={4}
                id="share"
                value={address}
                onChange={handleChange}
              />
              <ModalFooter>
                
                <Button 
                    colorScheme="blue" 
                    mr={3} 
                    onClick={submitAddress}
                    isLoading={loading ? true : false}>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  )
}
