import { userDetail } from "@/hooks/userDetail";
import {Avatar} from "@nextui-org/react";
import UpdateprofileComponent from "@/components/main/profile/updateprofile";
import { getUserImgById } from "@/database/userDetail";
import ChangePasswordModal from "@/components/main/profile/changePasswordModal";



export default async function editProfilePage() {
    return (
        <>
            <p className="text-xl text-center font-bold">Edit Profile</p>
            <div className="flex justify-center">
                <div className="flex justify-between">
                    <div className="flex items-start">

                        <div className="w-96">
                            <UpdateprofileComponent />
                            <ChangePasswordModal />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

