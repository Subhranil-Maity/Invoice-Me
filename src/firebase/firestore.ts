import {getFirestore} from "@firebase/firestore";
import {app} from "@/firebase/firebaseconfig";

const db = getFirestore(app)
export {
    db
}
