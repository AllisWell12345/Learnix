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
  where,
} from "firebase/firestore";
import { getDataId } from "./getIdService.js";

const COLLECTION_NAME = "videos";

/**
 * - 강의 등록폼의 강의 동영상을 따로 컬렉션에 저장하는 함수
 * @param {*} videoData 
 * @returns 
 */
export const createVideo = async (videoData) => {
  try {
    const videoId = await getDataId("video");

    const newVideo = {
      ...videoData,
      videoId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(videoId)), newVideo);

    return newVideo;
  } catch (error) {
    throw error;
  }
};

/**
 * - 특정 강의의 동영상 전체조회 (주차별로 자동 정렬)
 * @param {*} lectureId 
 * @returns 
 */
export const getVideosByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", lectureId),
      orderBy("order", "asc")
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

/**
 * - 강의 수정 폼에서 동영상을 수정할 때 호출하는 함수
 * @param {*} videoId 
 * @param {*} updateData 
 */
export const updateVideo = async (videoId, updateData) => {
  try {
    const videoRef = doc(db, COLLECTION_NAME, String(videoId));
    await updateDoc(videoRef, updateData);
  } catch (error) {
    throw error;
  }
};

/**
 * - 기본 삭제 함수
 * @param {*} videoId 
 */
export const deleteVideo = async (videoId) => {
  try {
    const videoRef = doc(db, COLLECTION_NAME, String(videoId));
    await deleteDoc(videoRef);
  } catch (error) {
    throw error;
  }
};

/**
 * - 특정 강의가 삭제 되면 그 강의의 동영상을 전체 삭제하는 함수
 * @param {*} lectureId 
 */
export const deleteVideosByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", Number(lectureId))
    );

    const snapshot = await getDocs(q);

    await Promise.all(snapshot.docs.map((docItem) => deleteDoc(docItem.ref)));
  } catch (error) {
    throw error;
  }
};