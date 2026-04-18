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

const COLLECTION_NAME = "comments";

// 등록
export const createComment = async (commentData) => {
  try {
    const commentId = await getDataId("comment");

    const newComment = {
      ...commentData,
      commentId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(commentId)), newComment);

    return newComment;
  } catch (error) {
    throw error;
  }
};

// 개별조회
export const getCommentById = async (commentId) => {
  try {
    const commentRef = doc(db, COLLECTION_NAME, String(commentId));
    const commentSnap = await getDoc(commentRef);

    if (!commentSnap.exists()) return null;

    return {
      id: commentSnap.id,
      ...commentSnap.data(),
    };
  } catch (error) {
    throw error;
  }
};

// 전체조회
export const getCommentsAll = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("commentId", "desc"));
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
export const updateComment = async (commentId, updateData) => {
  try {
    const commentRef = doc(db, COLLECTION_NAME, String(commentId));
    await updateDoc(commentRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteComment = async (commentId) => {
  try {
    const commentRef = doc(db, COLLECTION_NAME, String(commentId));
    await deleteDoc(commentRef);
  } catch (error) {
    throw error;
  }
};