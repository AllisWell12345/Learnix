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

// 특정 강의를 신청한 수강생 목록 조회
export const getAttendingsByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", Number(lectureId)),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// 전체 수강 신청 데이터 조회
export const getAttendingsAll = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// 전달받은 강의 목록 기준으로 lectureId별 수강생 수를 계산
export const getAttendingCountMapByLectures = async (lectures = []) => {
  try {
    if (!lectures.length) return {};

    const lectureIdSet = new Set(
      lectures.map((lecture) => Number(lecture.lectureId)),
    );

    const attendings = await getAttendingsAll();

    return attendings.reduce((acc, attending) => {
      const lectureId = Number(attending.lectureId);

      if (lectureIdSet.has(lectureId)) {
        acc[lectureId] = (acc[lectureId] || 0) + 1;
      }

      return acc;
    }, {});
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

// 특정 강의를 신청한 attending 전체 삭제
export const deleteAttendingsByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", Number(lectureId)),
    );

    const querySnapshot = await getDocs(q);

    await Promise.all(
      querySnapshot.docs.map((attendingDoc) => deleteDoc(attendingDoc.ref)),
    );
  } catch (error) {
    throw error;
  }
};