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
  where,
} from "firebase/firestore";
import { getDataId } from "./getIdService.js";

const COLLECTION_NAME = "carts";

// 등록
export const createCart = async (cartData) => {
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
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => Number(b.cartId) - Number(a.cartId));
  } catch (error) {
    throw error;
  }
};

// 현재 유저 장바구니 전체조회
export const getCartsByUserId = async (userId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", Number(userId)),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => Number(b.cartId) - Number(a.cartId));
  } catch (error) {
    throw error;
  }
};

// 현재 유저 + 현재 강의 장바구니 조회
export const getCartByUserAndLecture = async (userId, lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", Number(userId)),
      where("lectureId", "==", Number(lectureId)),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const firstDoc = querySnapshot.docs[0];

    return {
      id: firstDoc.id,
      ...firstDoc.data(),
    };
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

// 특정 강의가 담긴 장바구니 전체 삭제
export const deleteCartsByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", Number(lectureId)),
    );

    const querySnapshot = await getDocs(q);

    await Promise.all(
      querySnapshot.docs.map((cartDoc) => deleteDoc(cartDoc.ref)),
    );
  } catch (error) {
    throw error;
  }
};