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

// 등록
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

// 특정 강의의 비디오 전체조회 (주차별 자동 정렬)
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

// 수정
export const updateVideo = async (videoId, updateData) => {
  try {
    const videoRef = doc(db, COLLECTION_NAME, String(videoId));
    await updateDoc(videoRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteVideo = async (videoId) => {
  try {
    const videoRef = doc(db, COLLECTION_NAME, String(videoId));
    await deleteDoc(videoRef);
  } catch (error) {
    throw error;
  }
};