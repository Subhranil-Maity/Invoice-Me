"use client"
import React, {useContext, useState, useEffect, useRef} from "react";
import {
    createUserWithEmailAndPassword, sendEmailVerification,
    signInWithEmailAndPassword as sG,
    signOut,
    User,
    UserCredential
} from "@firebase/auth";
import {auth} from "@/firebase/auth";
import {doc, getDoc, setDoc} from "@firebase/firestore";
import {db} from "@/firebase/firestore";
import CircularLoader from "@/components/curcularloader";

type UserData = {
    uuid: string,
    orgName: string,
    email: string,
    avatar: string,
}
export type {UserData}

type AuthContextType = {
    currentUser: User | null;
    userDataObj: UserData;
    signInWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
    signUpWithEmailAndPassword: (email: string, password: string, orgName: string) => UserCredential | null;
    logOut: () => Promise<void>;
    loading: boolean;
    reSendEmailVerification: (user: User) => void;
}
const AuthContext = React.createContext({} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState(null as User | null)
    const [userDataObj, setUserDataObj] = useState({} as UserData)
    const [loading, setLoading] = useState(true)

    function reSendEmailVerification(user: User) {
        sendEmailVerification(user)
            .then(() => {
                console.log("Email verification sent")
            })
            .catch((error) => {
                console.error("Error sending email verification: ", error)
            })
    }

    function signUpWithEmailAndPassword(email: string, password: string, orgName: string): UserCredential | null {
        let result = null;
        createUserWithEmailAndPassword(auth, email, password).then(async (value) => {
            const savableData: UserData = {
                uuid: value.user.uid,
                orgName: orgName,
                email: email,
                avatar: "",
            }
            const docRef = doc(db, "users", value.user.uid)
            await setDoc(docRef, savableData)

                .then(() => {
                    console.log("Document written with ID: ", value.user.uid);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            result = value
        }).catch((error) => {
            console.error("Error signing up: ", error)
            alert(error.message)
        })
        console.log(orgName)
        return result
    }

    function signInWithEmailAndPassword(email: string, password: string) {
        return sG(auth, email, password);
    }

    function logOut() {
        setCurrentUser(null)
        setUserDataObj({} as UserData)
        return signOut(auth)
    }

    useEffect(() => {
        console.log("useEffect")
        const unsubscribe = auth.onAuthStateChanged(async user => {
            try {
                setLoading(true)
                if (!user) {
                    console.log("No user is signed in")
                    return
                }
                console.log("User is signed in: ", user)
                setCurrentUser(user)
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)
                let firestoreData = {}
                if (docSnap.exists()) {
                    firestoreData = docSnap.data()
                    setUserDataObj(firestoreData as UserData)
                    console.log("Document data:", firestoreData)
                } else {
                    console.log("No such document!")
                }
            } catch (err) {
                console.log("Error in useEffect: ", err)
            } finally {
                setLoading(false)
            }

        })
        return unsubscribe

    }, []);

    const value = {
        currentUser,
        userDataObj,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        logOut,
        loading,
        reSendEmailVerification
    }
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CircularLoader size={60} />
            </div>
        )
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}