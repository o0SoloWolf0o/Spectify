import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

interface Props {
    buttonText: string;
    children: React.ReactNode;
}

export default function ModalComponent({ buttonText, children }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <button onClick={onOpen}>{buttonText}</button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
                            <ModalBody>{children}</ModalBody>
                            {/* <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
