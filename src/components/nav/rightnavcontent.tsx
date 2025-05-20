"use client"

import SignInOut from "@/components/nav/signinout";
import {useAuth} from "@/context/authcontext";
import { useRouter } from "next/navigation"
import {UserNav} from "@/components/nav/usernav";

export default function RightNavContent() {
    const { currentUser, userDataObj} = useAuth();
    console.log("USER......." + userDataObj.orgName)
    const router = useRouter()
    let content;
    if (!currentUser){
        content = <SignInOut/>
    } else {
        // content = <Button size="sm" onClick={logOut}>Sign Out {currentUser.email}</Button>
        content = <UserNav user={userDataObj}/>
        if (
            currentUser &&
            !currentUser.emailVerified ||
            currentUser.emailVerified == undefined &&
            window.location.pathname !== "/email-not-verified"
        ) {
            router.push("/email-not-verified")
        }
    }
    return (
        <>
            {content}
        </>
    );
}