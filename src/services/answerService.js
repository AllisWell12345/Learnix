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

const COLLECTION_NAME = "answers";

// 등록
export const createAnswer = async (answerData) => {
  try {
    const answerId = await getDataId("answer");

    const newAnswer = {
      ...answerData,
      answerId,
    };

    await setDoc(doc(db, COLLECTION_NAME, String(answerId)), newAnswer);

    return newAnswer;
  } catch (error) {
    throw error;
  }
};

// 개별조회
export const getAnswerById = async (answerId) => {
  try {
    const answerRef = doc(db, COLLECTION_NAME, String(answerId));
    const answerSnap = await getDoc(answerRef);

    if (!answerSnap.exists()) return null;

    return {
      id: answerSnap.id,
      ...answerSnap.data(),
    };
  } catch (error) {
    throw error;
  }
};

// 전체조회
export const getAnswersAll = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("answerId", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// questionId로 답변 조회
export const getAnswerByQuestionId = async (questionId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("questionId", "==", questionId)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
  } catch (error) {
    throw error;
  }
};

// 특정 강의에 답변이 하나라도 있는지 확인
export const hasAnswersByLectureId = async (lectureId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("lectureId", "==", Number(lectureId))
    );

    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    throw error;
  }
};

// 수정
export const updateAnswer = async (answerId, updateData) => {
  try {
    const answerRef = doc(db, COLLECTION_NAME, String(answerId));
    await updateDoc(answerRef, updateData);
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteAnswer = async (answerId) => {
  try {
    const answerRef = doc(db, COLLECTION_NAME, String(answerId));
    await deleteDoc(answerRef);
  } catch (error) {
    throw error;
  }
};

// 특정 강의의 답변 전체 삭제
export const deleteAnswersByLectureId = async (lectureId) => {
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