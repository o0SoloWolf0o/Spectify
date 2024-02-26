"use server";

import { changePassword, isOldPasswordCorrect} from "@/database/changePassword";
import { changePasswordSchema } from "@/schemas";
import * as z from "zod";

export default async function ChangePassword(email: string, values: z.infer<typeof changePasswordSchema>) {
    const { oldPassword, newPassword } = values;

    const isOldPasswordValid = await isOldPasswordCorrect(email, oldPassword);
    if (!isOldPasswordValid) {
        return { success: false, message: "Old password is incorrect" };
    }

    await changePassword(email, newPassword);
    return { success: true, message: "" };
}
