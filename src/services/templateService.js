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
  orderBy,
} from "firebase/firestore";
import { getDataId } from "./getIdService.js";

const COLLECTION_NAME = "templates";

// 등록
export const createTemplate = async (templateData) => {
  try {
    const templateId = await getDataId("template");

    const newTemplate = {
      ...templateData,
      templateId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(templateId)), newTemplate);

    return newTemplate;
  } catch (error) {
    throw error;
  }
};

// 개별조회
export const getTemplateById = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", String(lectureId)) 
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("해당 강의의 템플릿이 없습니다.");
      return null;
    }
    
    const docSnap = querySnapshot.docs[0];
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error("템플릿 조회 에러:", error);
    throw error;
  }
};

// 전체조회
export const getTemplatesAll = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("templateId", "desc"));
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
export const updateTemplate = async (templateId, updateData) => {
  try {
    const templateRef = doc(db, COLLECTION_NAME, String(templateId));
    await updateDoc(templateRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteTemplate = async (templateId) => {
  try {
    const templateRef = doc(db, COLLECTION_NAME, String(templateId));
    await deleteDoc(templateRef);
  } catch (error) {
    throw error;
  }
};

// 특정 강의의 템플릿 삭제
export const deleteTemplateByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", String(lectureId)),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return;

    const firstDoc = querySnapshot.docs[0];
    await deleteDoc(firstDoc.ref);
  } catch (error) {
    console.error("템플릿 삭제 실패:", error);
    throw error;
  }
};