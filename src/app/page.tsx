"use client"
import {useAuth} from "@/context/authcontext";

export default function Home() {
    const { currentUser } = useAuth();
    if (currentUser) {
        window.location.href = "/dashboard"
    }else {
        window.location.href = "/home"
    }
  return (
    <div>

    </div>
  );
}
