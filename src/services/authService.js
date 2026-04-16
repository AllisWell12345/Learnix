import { auth } from "../firebase/config.js";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
}

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const currentuser = userCredential.user;

    return currentuser;
}

export const logout = async () => {
    await signOut(auth);
}

export const deleteAccount = async () => {
    await deleteUser(auth.currentUser);
}
