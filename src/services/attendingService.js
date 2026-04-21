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
  getCountFromServer,
} from "firebase/firestore";
import { getDataId } from "./getIdService.js";

const COLLECTION_NAME = "attendings";

/**
 * - 수강생이 신청한 강의들을 유저 구분 없이 모두 하나의 컬렉션에 저장하는 함수
 * @param {*} attendingData 
 * @returns 
 */
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

/**
 * - 고유 id로 개별 조회하는 함수
 * @param {*} attendingId 
 * @returns 
 */
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

/**
 * - 특정 유저의 신청한 강의를 모두 조회하는 함수 (수강생의 내 강의 페이지를 위함)
 * @param {*} userId 
 * @returns 
 */
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

/**
 * - 특정 유저가 특정 강의를 신청했다면 그 강의를 조회하는 함수
 * @param {*} userId 
 * @param {*} lectureId 
 * @returns 
 */
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

/**
 * - 신청한 강의 전체 조회하는 함수
 * @returns 
 */
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

/**
 * - 특정 강의의 수강생 수만 조회하는 함수
 * @param {*} lectureId 
 * @returns 
 */
export const getAttendingCountByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", Number(lectureId)),
    );

    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    throw error;
  }
};

/**
 * - 전달받은 강의 목록 기준으로 lectureId별 수강생 수를 계산하는 함수
 * @param {*} lectures 
 * @returns 
 */
export const getAttendingCountMapByLectures = async (lectures = []) => {
  try {
    if (!lectures.length) return {};

    const uniqueLectureIds = [
      ...new Set(lectures.map((lecture) => Number(lecture.lectureId))),
    ];

    const countResults = await Promise.all(
      uniqueLectureIds.map(async (lectureId) => {
        const count = await getAttendingCountByLectureId(lectureId);
        return { lectureId, count };
      }),
    );

    return countResults.reduce((acc, item) => {
      acc[item.lectureId] = item.count;
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

/**
 * - 특정 강의를 신청한 attending 전체 삭제하는 함수 (관리자가 강의를 삭제한 경우를 위함)
 * @param {*} lectureId 
 */
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