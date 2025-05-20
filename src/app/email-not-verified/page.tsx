"use client"
import {Button} from "@/components/ui/button";
import {useAuth} from "@/context/authcontext";
import {useEffect} from "react";


export default function PageNotVerified() {
    const { currentUser, reSendEmailVerification } = useAuth();
    useEffect(() => {
        if (currentUser) {
            if (currentUser.emailVerified || currentUser.emailVerified == undefined) {
                window.location.href = "/"
            }
        }
    }, [currentUser]);

    function onClick() {
        if (currentUser) {
            reSendEmailVerification(currentUser)
        }
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Email Not Verified</h1>
      <p className="mt-4">Please verify your email address to continue</p>
        <p className="mt-2">Check your inbox for a verification email.</p>
      <Button className="mt-4" size="sm" onClick={onClick}>
        Resend Verification Email
        </Button>
    </div>
  );
}