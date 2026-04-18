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

const COLLECTION_NAME = "lectures";

// 등록
export const createLecture = async (lectureData) => {
  try {
    const lectureId = await getDataId("lecture");

    const newLecture = {
      ...lectureData,
      lectureId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(lectureId)), newLecture);

    return newLecture;
  } catch (error) {
    throw error;
  }
};

// 개별조회
export const getLectureById = async (lectureId) => {
  try {
    const lectureRef = doc(db, COLLECTION_NAME, String(lectureId));
    const lectureSnap = await getDoc(lectureRef);

    if (!lectureSnap.exists()) return null;

    return {
      id: lectureSnap.id,
      ...lectureSnap.data(),
    };
  } catch (error) {
    throw error;
  }
};

// 전체조회
export const getLecturesAll = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("lectureId", "desc"));
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
export const updateLecture = async (lectureId, updateData) => {
  try {
    const lectureRef = doc(db, COLLECTION_NAME, String(lectureId));
    await updateDoc(lectureRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteLecture = async (lectureId) => {
  try {
    const lectureRef = doc(db, COLLECTION_NAME, String(lectureId));
    await deleteDoc(lectureRef);
  } catch (error) {
    throw error;
  }
};