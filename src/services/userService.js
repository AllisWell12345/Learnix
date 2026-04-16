import { db } from "../firebase/config.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getDataId } from "./getIdService.js";

export const createUser = async (userData) => {
  const userId = await getDataId("user");

  const newUser = {
    ...userData,
    userId: userId,
  };

  await setDoc(doc(db, "users", userData.uid), newUser);

  return newUser;
};

export const getUserByUid = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return userSnap.data();
};