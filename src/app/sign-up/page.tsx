"use client"
import * as React from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

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
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {useAuth} from "@/context/authcontext";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string(),
    orgName: z.string().min(3),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function SignUp() {
    const {signUpWithEmailAndPassword} = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            orgName: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const result = signUpWithEmailAndPassword(values.email, values.password, values.orgName);
        if (!result) {
            alert("Error signing up")
            return
        }else {
            console.log(result)
            window.location.href = "/"
        }
        // result.then((res) => {
        //     window.location.href = "/"
        // }).catch((err) => {
        //     alert(err.message)
        // })
    }

    return (
        <div className="flex items-center justify-center h-160 ">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Sign Up to start invoicing</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <FormField
                                        control={form.control}
                                        name="orgName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Organisation/Individual Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Organistaion Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="abcd@example.com" {...field} type="email"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Create Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Password" {...field} type="password"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="ReEnter Password" {...field} type="password"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Button type="submit" >Sign Up</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <OrSeparator/>
                </CardContent>
                <CardFooter className="flex flex-col space-y-1.5">
                    <SignInWithGoogle/>
                </CardFooter>
            </Card>
        </div>
    );
}