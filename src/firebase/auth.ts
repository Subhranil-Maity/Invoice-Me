import {getAuth} from "@firebase/auth";
import {app} from "@/firebase/firebaseconfig";


const auth = getAuth(app)

export {
    auth
}