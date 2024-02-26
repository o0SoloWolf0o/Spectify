import { getManyUserImgById } from "@/database/userDetail";
import { getSeachUserByUsername } from "@/database/user";

export async function getManyUserImg(userIds: string[]) {
    const userDetail = await getManyUserImgById(userIds);
    return userDetail;
}

export async function searchUser(searchValue: string) {
    const user = await getSeachUserByUsername(searchValue);
    return user;
}