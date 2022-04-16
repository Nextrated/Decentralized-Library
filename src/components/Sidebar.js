import { Avatar, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Text, useColorModeValue} from '@chakra-ui/react'
import React from 'react'

export default function Sidebar(
    {
        isOpen, onClose, btnRef, setAllPage, setPrivatePage, setPublicPage, setMyPublicPage, setSharedPage
    }) {
    const bg = useColorModeValue("blackAlpha.100", "primaryLight");

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay/>
        <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>
                MetaFiles
            </DrawerHeader>
            <DrawerBody px="0">
                <Avatar name="Anonymous" src="dp.png" d="block" mx="auto" mb={5} boxSize="100px"/>
                <hr/>
                <Box textAlign="left" cursor="pointer" fontWeight="600" fontSize="md">
                    <Text py={3} pl={2} _hover={{bg:bg}} onClick={setAllPage}>All Files</Text>
                    <Text py={3} pl={2} _hover={{bg:bg}} onClick={setPublicPage}>Public Files</Text>
                    <Text py={3} pl={2} _hover={{bg:bg}} onClick={setMyPublicPage}>My Public Files</Text>
                    <Text py={3} pl={2} _hover={{bg:bg}} onClick={setPrivatePage}>Your Private Files</Text>
                    <Text py={3} pl={2} _hover={{bg:bg}} onClick={setSharedPage}>Shared With You</Text>
                </Box>
            </DrawerBody>
            <DrawerFooter>
                <Text fontSize="12px">&copy;Team Ace 2022</Text>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
  )
}
