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

const COLLECTION_NAME = "questions";

// 등록
export const createQuestion = async (questionData) => {
  try {
    const questionId = await getDataId("question");

    const newQuestion = {
      ...questionData,
      questionId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(questionId)), newQuestion);

    return newQuestion;
  } catch (error) {
    throw error;
  }
};

// 개별조회
export const getQuestionById = async (questionId) => {
  try {
    const questionRef = doc(db, COLLECTION_NAME, String(questionId));
    const questionSnap = await getDoc(questionRef);

    if (!questionSnap.exists()) return null;

    return {
      id: questionSnap.id,
      ...questionSnap.data(),
    };
  } catch (error) {
    throw error;
  }
};

// 전체조회
export const getQuestionsAll = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("questionId", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// lectureId + projectId로 질문 조회
export const getQuestionsByLectureAndProject = async (lectureId, projectId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", lectureId),
      where("projectId", "==", projectId),
      orderBy("questionId", "asc")
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

// lectureId로 전체 조회 (InterviewTotalPage용)
export const getQuestionsByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", lectureId),
      orderBy("questionId", "desc")
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
export const updateQuestion = async (questionId, updateData) => {
  try {
    const questionRef = doc(db, COLLECTION_NAME, String(questionId));
    await updateDoc(questionRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteQuestion = async (questionId) => {
  try {
    const questionRef = doc(db, COLLECTION_NAME, String(questionId));
    await deleteDoc(questionRef);
  } catch (error) {
    throw error;
  }
};

// 특정 강의의 질문 전체 삭제
export const deleteQuestionsByLectureId = async (lectureId) => {
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

// projectId로 질문 전체 조회
export const getQuestionsByProjectId = async (projectId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("projectId", "==", Number(projectId)),
      orderBy("questionId", "asc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// 특정 projectId의 질문 전체 삭제
export const deleteQuestionsByProjectId = async (projectId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("projectId", "==", Number(projectId))
    );

    const snapshot = await getDocs(q);
    await Promise.all(snapshot.docs.map((docItem) => deleteDoc(docItem.ref)));
  } catch (error) {
    throw error;
  }
};