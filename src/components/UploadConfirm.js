import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React, {useRef} from 'react'

export default function UploadConfirm({view,proceedUpload,onClose, isOpen}) {
  const cancelRef = useRef();
  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay>Upload as {view}</AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogCloseButton/>
        <AlertDialogBody>
          Are you sure you want this file to be {view}? You cannot change it after upload 
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>No</Button>
          <Button colorScheme="blue" ml={3} onClick={proceedUpload}>Yes</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
