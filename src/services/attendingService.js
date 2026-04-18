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

const COLLECTION_NAME = "attendings";

// 등록
export const createAttending = async (attendingData) => {
  try {
    const attendingId = await getDataId("attending");

    const newAttending = {
      ...attendingData,
      attendingId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(attendingId)), newAttending);

    return newAttending;
  } catch (error) {
    throw error;
  }
};

// 개별조회
export const getAttendingById = async (attendingId) => {
  try {
    const attendingRef = doc(db, COLLECTION_NAME, String(attendingId));
    const attendingSnap = await getDoc(attendingRef);

    if (!attendingSnap.exists()) return null;

    return {
      id: attendingSnap.id,
      ...attendingSnap.data(),
    };
  } catch (error) {
    throw error;
  }
};

// 현재 유저 신청 강의 전체조회
export const getAttendingsByUserId = async (userId) => {
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
      .sort((a, b) => Number(b.attendingId) - Number(a.attendingId));
  } catch (error) {
    throw error;
  }
};

// 현재 유저 + 현재 강의 신청 여부 조회
export const getAttendingByUserAndLecture = async (userId, lectureId) => {
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
export const updateAttending = async (attendingId, updateData) => {
  try {
    const attendingRef = doc(db, COLLECTION_NAME, String(attendingId));
    await updateDoc(attendingRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteAttending = async (attendingId) => {
  try {
    const attendingRef = doc(db, COLLECTION_NAME, String(attendingId));
    await deleteDoc(attendingRef);
  } catch (error) {
    throw error;
  }
};