"use client";

import ChangePassword from "@/action/changePassword";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { changePasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import AuthErrorComponent from "./authError";
import AuthSuccessComponent from "./authSuccess";


export default function ChangePasswordComponent() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const userSession = useSession();
    const email = userSession?.data?.user?.email ?? "";

    const changePasswordForm = useForm<zod.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },

    });

    function changePasswordSubmit(values: zod.infer<typeof changePasswordSchema>) {
        startTransition(() => {
            ChangePassword(email,values).then((res) => {
                if (res.success) {
                    console.log(res.success);
                    setAuthSuccess("Password changed successfully");
                    changePasswordForm.reset();
                } else {
                    console.log(res.message);
                    setAuthError(res.message);
                }
            });
        });
    }


    return (
        <Form {...changePasswordForm}>
            <form onSubmit={changePasswordForm.handleSubmit(changePasswordSubmit)} className="space-y-4">
                <FormDescription>Your password must be at least 6 characters.</FormDescription>
                <div className="flex flex-col gap-3">
                    <FormItem>
                        <div className="relative">
                            <FormLabel htmlFor="oldPassword">Current password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="********"
                                    type={showCurrentPassword ? "text" : "password"}
                                    id="oldPassword"
                                    {...changePasswordForm.register("oldPassword")}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                size="icon"
                                variant="ghost"
                                className="absolute bottom-0 right-0"
                                tabIndex={-1}
                                disabled={isPending}
                            >
                                {showCurrentPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </Button>
                        </div>
                        <FormMessage>{changePasswordForm.formState.errors.oldPassword?.message}</FormMessage>
                    </FormItem>

                    <FormItem>
                        <div className="relative">
                            <FormLabel htmlFor="newPassword">New password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="********"
                                    type={showNewPassword ? "text" : "password"}
                                    id="newPassword"
                                    {...changePasswordForm.register("newPassword")}
                                />
                            </FormControl>
                            <Button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    size="icon"
                                    variant="ghost"
                                    className="absolute bottom-0 right-0"
                                    tabIndex={-1}
                                    disabled={isPending}
                                >
                                    {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </Button>
                        </div>
                        <FormMessage>{changePasswordForm.formState.errors.newPassword?.message}</FormMessage>
                    </FormItem>


                    <FormItem>
                        <div className="relative">
                        <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="********"
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                {...changePasswordForm.register("confirmPassword")}
                            />
                        </FormControl>
                        <Button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    size="icon"
                                    variant="ghost"
                                    className="absolute bottom-0 right-0"
                                    tabIndex={-1}
                                    disabled={isPending}
                                >
                                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </Button>
                        </div>
                        <FormMessage>{changePasswordForm.formState.errors.confirmPassword?.message}</FormMessage>
                    </FormItem>
                    <AuthErrorComponent message={authError} />
                    <AuthSuccessComponent message={authSuccess} />
                    <FormItem>
                        <FormControl>
                            <div className="flex justify-center">
                            <Button type="submit" disabled={isPending} className="bg-[#00A9FF] hover:bg-[#0087CC] text-white font-bold py-2 px-4 rounded-full w-full">
                                Change password
                            </Button>
                            </div>
                        </FormControl>
                    </FormItem>
                </div>
            </form>
        </Form>
    ); 
}
