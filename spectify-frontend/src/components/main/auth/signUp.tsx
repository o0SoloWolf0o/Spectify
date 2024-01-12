import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SignUpProps {
    setPanel: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpComponent({ setPanel }: SignUpProps) {
    const [showPassword, setShowPassword] = useState(false);

    const signUpForm = useForm<zod.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function signUpSubmit(values: zod.infer<typeof signUpSchema>) {
        console.log(values);
    }

    return (
        <>
            <Form {...signUpForm}>
                <h1>Sign up</h1>
                <FormDescription>Sign up to enjoy the feature of Revolutie.</FormDescription>
                <form onSubmit={signUpForm.handleSubmit(signUpSubmit)} className="space-y-8">
                    <div className="flex flex-col gap-3">
                        <FormField
                            control={signUpForm.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={signUpForm.control}
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
                            control={signUpForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type={signUpForm ? "text" : "password"} {...field} />
                                        </FormControl>
                                        <Button type="button" onClick={() => setShowPassword(!showPassword)} size="icon" variant="ghost" className="absolute bottom-0 right-0">
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={signUpForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign up
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
                        <p>Have an account?</p>
                        <button onClick={() => setPanel("signIn")}>Sign in</button>
                    </div>
                </div>
            </Form>
        </>
    );
}
