import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SignInProps {
    setPanel: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignInComponent({ setPanel }: SignInProps) {
    const [showPassword, setShowPassword] = useState(false);

    const signInForm = useForm<zod.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function signInSubmit(values: zod.infer<typeof signInSchema>) {
        console.log(values);
    }

    return (
        <>
            <Form {...signInForm}>
                <h1>Sign in</h1>
                <FormDescription>Please sign in to continue to your account.</FormDescription>
                <form onSubmit={signInForm.handleSubmit(signInSubmit)} className="space-y-8">
                    <div className="flex flex-col gap-3">
                        <FormField
                            control={signInForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={signInForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type={showPassword ? "text" : "password"} {...field} />
                                        </FormControl>
                                        <Button type="button" onClick={() => setShowPassword(!showPassword)} size="icon" variant="ghost" className="absolute bottom-0 right-0">
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
                <div className="flex items-center">
                    <hr className="flex-1 border-t border-gray-300" />
                    <p className="mx-4 text-gray-500">or</p>
                    <hr className="flex-1 border-t border-gray-300" />
                </div>

                <Button>
                    <FcGoogle className="mr-2" /> Sign in with Google
                </Button>

                <div className="flex flex-col items-center">
                    <div className="flex gap-2">
                        <p>Can't remember password?</p>
                        <button onClick={() => setPanel("forgotPassword")}>Reset Password</button>
                    </div>
                    <div className="flex gap-2">
                        <p>Need an account?</p>
                        <button onClick={() => setPanel("signUp")}>Sign up</button>
                    </div>
                </div>
            </Form>
        </>
    );
}
