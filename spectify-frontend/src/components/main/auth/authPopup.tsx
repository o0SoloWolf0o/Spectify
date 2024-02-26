"use client";

import { useEffect, useState } from "react";
import SignInComponent from "@/components/main/auth/signIn";
import SignUpComponent from "./signUp";
import ForgetPasswordComponent from "@/components/main/auth/forgetPassword";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

interface AuthPopupProps {
	className?: string;
	children?: React.ReactNode;
}

export default function AuthPopup({ className, children }: AuthPopupProps) {
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
			{children && (
				<Button onClick={onOpen} className={className}>
					{children}
				</Button>
			)}
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
