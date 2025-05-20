"use client"
import * as React from "react"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input";
import {OrSeparator} from "@/components/orseparator";
import SignInWithGoogle from "@/components/signinwithgoogle";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useAuth} from "@/context/authcontext";


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Password must be at least 8 characters",
    }),
})

export default function SignIn() {
    const {signInWithEmailAndPassword} = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const result = signInWithEmailAndPassword(values.email, values.password);
        result.then((res) => {
            window.location.href = "/"
        }).catch((err) => {
            alert(err.message)
        })
    }

    return (
        <div className="flex items-center justify-center h-160 ">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Sign In to start invoicing</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Registered Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="abcd@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Button type="submit">Sign In</Button>
                            </div>
                        </div>
                    </form>
                </Form>
                    <OrSeparator/>
                </CardContent>
                {/*<CardFooter className="flex justify-between">*/}
                <CardFooter className="flex flex-col space-y-1.5">
                    <SignInWithGoogle/>
                </CardFooter>
            </Card>
        </div>
    );
}