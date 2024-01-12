import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/schemas";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ForgetPasswordProps {
    setPanel: React.Dispatch<React.SetStateAction<string>>;
}

export default function ForgetPasswordComponent({ setPanel }: ForgetPasswordProps) {
    const forgetPasswordForm = useForm<zod.infer<typeof forgetPasswordSchema>>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    function forgetPasswordSubmit(values: { email: string }) {
        console.log(values);
    }

    return (
        <>
            <Form {...forgetPasswordForm}>
                <h1>Forget Password</h1>
                <FormDescription>Enter your account email, and we'll send a secure password reset message.</FormDescription>

                <form onSubmit={forgetPasswordForm.handleSubmit(forgetPasswordSubmit)} className="space-y-8">
                    <FormField
                        control={forgetPasswordForm.control}
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
                    <Button type="submit" className="w-full">
                        Send mail
                    </Button>
                </form>
                <div className="flex flex-col items-center">
                    <div className="flex gap-2">
                        <p>Remember your password?</p>
                        <button onClick={() => setPanel("signIn")}>Sign in</button>
                    </div>
                </div>
            </Form>
        </>
    );
}
