"use client";

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import ChangePasswordComponent from "../auth/changePassword";

export default function ChangePasswordModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <div className="flex justify-center mt-16">
      <Button className="w-full font-bold" onPress={onOpen}>Do you want to change password ?</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          
            <>
              <ModalHeader className="flex flex-col gap-1">Change your password</ModalHeader>
              <ModalBody>
                <ChangePasswordComponent />
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
        </ModalContent>
      </Modal>
      </div>
    </>
  );
}
