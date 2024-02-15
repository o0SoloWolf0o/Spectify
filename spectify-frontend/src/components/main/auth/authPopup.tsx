"use client";

import { useEffect, useState } from "react";
import SignInComponent from "@/components/main/auth/signIn";
import SignUpComponent from "./signUp";
import ForgetPasswordComponent from "@/components/main/auth/forgetPassword";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";

interface AuthPopupProps {
	buttonText?: string | "modal";
}

export default function AuthPopup({ buttonText }: AuthPopupProps) {
	const [panel, setPanel] = useState("signIn");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isPending, setIsPending] = useState(false);

	useEffect(() => {
		if (!isOpen) {
			setPanel("signIn");
		}
	}, [isOpen]);

	return (
		<>
			{buttonText && <button onClick={onOpen}>{buttonText}</button>}{" "}
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={!isPending}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody>
								{panel === "signIn" && <SignInComponent setPanel={setPanel} />}
								{panel === "signUp" && <SignUpComponent setPanel={setPanel} />}
								{panel === "forgotPassword" && <ForgetPasswordComponent setPanel={setPanel} />}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
