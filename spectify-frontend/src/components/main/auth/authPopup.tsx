"use client";

import { useState } from "react";
import SignInComponent from "@/components/main/auth/signIn";
import SignUpComponent from "./signUp";
import ForgetPasswordComponent from "@/components/main/auth/forgetPassword";
import ModalComponent from "@/components/utils/modal";

interface AuthPopupProps {
    buttonText?: string | "modal";
}

export default function AuthPopup({ buttonText }: AuthPopupProps) {
    const [panel, setPanel] = useState("signIn");

    return (
        <>
            <ModalComponent buttonText={buttonText}>
                {panel === "signIn" && <SignInComponent setPanel={setPanel} />}
                {panel === "signUp" && <SignUpComponent setPanel={setPanel} />}
                {panel === "forgotPassword" && <ForgetPasswordComponent setPanel={setPanel} />}
            </ModalComponent>
        </>
    );
}
