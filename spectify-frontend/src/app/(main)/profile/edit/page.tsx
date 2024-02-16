import { userDetail } from "@/hooks/userDetail";
import {Avatar} from "@nextui-org/react";
import UpdateprofileComponent from "@/components/main/profile/updateprofile";
import { getUserImgById } from "@/database/userDetail";



export default async function editProfilePage() {
    return (
        <>
            <p className="text-xl text-center">Edit Profile</p>
            <div className="flex justify-center">
                <div className="flex justify-between">
                    <div className="flex items-start">

                        <div className="w-96">
                            <UpdateprofileComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

