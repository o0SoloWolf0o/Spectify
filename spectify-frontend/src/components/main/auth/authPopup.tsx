import { useState } from "react";
import SignInComponent from "./signIn";
import SignUpComponent from "./signUp";
import ForgetPasswordComponent from "./forgetPassword";

export default function AuthPopup() {
    const [panel, setPanel] = useState("signIn");

    return (
        <>
            {panel === "signIn" && <SignInComponent setPanel={setPanel} />}
            {panel === "signUp" && <SignUpComponent setPanel={setPanel} />}
            {panel === "forgotPassword" && <ForgetPasswordComponent setPanel={setPanel} />}
        </>
    );
}
