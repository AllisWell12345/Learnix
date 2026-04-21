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

const COLLECTION_NAME = "projects";

// 등록
export const createProject = async (projectData) => {
  try {
    const projectId = await getDataId("project");

    const newProject = {
      ...projectData,
      projectId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(projectId)), newProject);

    return newProject;
  } catch (error) {
    throw error;
  }
};

// 개별조회
export const getProjectById = async (projectId) => {
  try {
    const projectRef = doc(db, COLLECTION_NAME, String(projectId));
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) return null;

    return {
      id: projectSnap.id,
      ...projectSnap.data(),
    };
  } catch (error) {
    throw error;
  }
};

/**
 * - 현재 유저가 특정 강의에 제출한 프로젝트 조회하는 함수
 * @param {*} userId 
 * @param {*} lectureId 
 * @returns 
 */
export const getProjectByUserAndLecture = async (userId, lectureId) => {
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

// 전체조회
export const getProjectsAll = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("projectId", "desc"));
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
export const updateProject = async (projectId, updateData) => {
  try {
    const projectRef = doc(db, COLLECTION_NAME, String(projectId));
    await updateDoc(projectRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteProject = async (projectId) => {
  try {
    const projectRef = doc(db, COLLECTION_NAME, String(projectId));
    await deleteDoc(projectRef);
  } catch (error) {
    throw error;
  }
};

/**
 * - 특정 강의의 프로젝트 전체 삭제하는 함수 (관리자의 강의 삭제 경우를 위함)
 * @param {*} lectureId 
 */
export const deleteProjectsByLectureId = async (lectureId) => {
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