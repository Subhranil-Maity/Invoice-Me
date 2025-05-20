import Image from "next/image";
import {Button} from "@/components/ui/button";
import * as React from "react";

export default function SignInWithGoogle() {
    return(
        <Button variant="outline" className="w-full">
            <Image
                src="/google-logo.svg" // place logo in /public/google-logo.svg
                alt="Google"
                width={20}
                height={20}
            />
            Sign In With Google
        </Button>
    );
}