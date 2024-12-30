import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// A function to map Firebase error codes to user-friendly messages
const getErrorMessage = (code) => {
    const errorMessages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "The email address is not valid.",
        "auth/weak-password": "The password is too weak. Please use a stronger password.",
        "auth/user-not-found": "No user found with this email address.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/user-disabled": "Access denied! Your account is disabled.",
        "auth/admin-restricted-operation": "Access denied! Sign-Up was restricted by an Admin!",
        "auth/logged-in": "Login Successful!"

    };
    return errorMessages[code] || "An unexpected error occurred. Please try again.";
};

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.error(error);
        const message = getErrorMessage(error.code);
        toast.error(message);
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        const message = getErrorMessage(error.code);
        toast.success(message);
    }
};

const logout = () => {
    signOut(auth);
};

export { auth, db, login, signup, logout };
