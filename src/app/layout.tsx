import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/navbar";
import {AuthProvider} from "@/context/authcontext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Invoice Me",
    description: "A simple invoice management system",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={"dark"}>

        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider>
            <Navbar/>
            {children}
        </AuthProvider>
        </body>

        </html>
    );
}
