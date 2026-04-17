import { db } from "../firebase/config.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { getDataId } from "./getIdService.js";

const COLLECTION_NAME = "carts";

// 등록
export const createcart = async (cartData) => {
  try {
    const cartId = await getDataId("cart");

    const newCart = {
      ...cartData,
      cartId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(cartId)), newCart);

    return newCart;
  } catch (error) {
    throw error;
  }
};

// 개별조회
export const getCartById = async (cartId) => {
  try {
    const cartRef = doc(db, COLLECTION_NAME, String(cartId));
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) return null;

    return {
      id: cartSnap.id,
      ...cartSnap.data(),
    };
  } catch (error) {
    throw error;
  }
};

// 전체조회
export const getCartsAll = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("cartId", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// 수정
export const updateCart = async (cartId, updateData) => {
  try {
    const cartRef = doc(db, COLLECTION_NAME, String(cartId));
    await updateDoc(cartRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteCart = async (cartId) => {
  try {
    const cartRef = doc(db, COLLECTION_NAME, String(cartId));
    await deleteDoc(cartRef);
  } catch (error) {
    throw error;
  }
};