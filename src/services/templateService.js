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

const COLLECTION_NAME = "templates";

/* 1. 템플릿 등록 */
export const createTemplate = async (templateData) => {
  try {
    const docId = String(templateData.lectureId);

    const newTemplate = {
      ...templateData,
      lectureId: Number(templateData.lectureId),
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, COLLECTION_NAME, docId), newTemplate);

    return newTemplate;
  } catch (error) {
    console.error("템플릿 등록 실패:", error);
    throw error;
  }
};

/* 2. 템플릿 개별 조회 */
export const getTemplateById = async (lectureId) => {
  try {
    if (!lectureId) return null;

    const templateRef = doc(db, COLLECTION_NAME, String(lectureId));
    const templateSnap = await getDoc(templateRef);

    if (!templateSnap.exists()) {
      console.log(`강의 ${lectureId}번에 대한 템플릿이 없습니다.`);
      return null;
    }

    return {
      id: templateSnap.id,
      ...templateSnap.data(),
    };
  } catch (error) {
    console.error("템플릿 조회 실패:", error);
    throw error;
  }
};

/* 3. 전체 템플릿 조회 */
export const getTemplatesAll = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("전체 템플릿 조회 실패:", error);
    throw error;
  }
};

/* 4. 템플릿 수정 */
export const updateTemplate = async (lectureId, updateData) => {
  try {
    const templateRef = doc(db, COLLECTION_NAME, String(lectureId));
    await updateDoc(templateRef, updateData);
  } catch (error) {
    console.error("템플릿 수정 실패:", error);
    throw error;
  }
};

/* 5. 템플릿 삭제 */
export const deleteTemplate = async (lectureId) => {
  try {
    const templateRef = doc(db, COLLECTION_NAME, String(lectureId));
    await deleteDoc(templateRef);
  } catch (error) {
    console.error("템플릿 삭제 실패:", error);
    throw error;
  }
};