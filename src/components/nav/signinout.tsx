import Link from "next/link";
import {Button} from "@/components/ui/button";


export default function SignInOut() {
    return (
        <div className="flex items-center space-x-4">
            <Link href="/sign-in">
                <Button variant="outline" size="sm">
                    Sign In
                </Button>
            </Link>
            <Link href="/sign-up">
                <Button size="sm">Sign Up</Button>
            </Link>
        </div>
    );
}