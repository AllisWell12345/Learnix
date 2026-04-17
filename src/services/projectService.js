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