import { db } from "../firebase/config.js";
import { doc, setDoc, getDoc, orderBy, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
import { getDataId } from "./getIdService.js";

const COLLECTION_NAME = "users";

/**
 * - 회원가입과 동시에 파이어스토어에 유저 정보를 생성하여 저장하는 함수
 * @param {*} userData 
 * @returns 
 */
export const createUser = async (userData) => {
  try {
    const userId = await getDataId("user");

    const newUser = {
      ...userData,
      userId: userId,
    };

    await setDoc(doc(db, COLLECTION_NAME, userData.uid), newUser);

    return newUser;
  }catch(error) {
    throw error;
  }
};

/**
 * - 현재 로그인한 유저의 정보를 읽어오기 위해 auth의 currentUser.uid를 이용하는 단일 조회 함수
 * @param {*} uid 
 * @returns 
 */
export const getUserByUid = async (uid) => {
  try {
    const userRef = doc(db, COLLECTION_NAME, uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data();
  }catch(error) {
    throw error;
  }
};

/**
 * - 관리자의 회원 관리에서 사용하기 위해 만든 전체 회원을 조회하는 함수(userId 기준 내림차순)
 * - 관리자 회원가입은 따로 없어서 관리자의 userId는 100으로 둬서 임의로 관리자 정보를 저장함(관리자가 항사 맨 위에 뜨기 위함)
 * @returns 
 */
export const getUsersAll = async () => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME), 
            orderBy('userId', 'desc')
        )

        const querySnapshot = await getDocs(q);

        const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        return users;

    }catch(error) {
        throw error;
    }
}

/**
 * - 관리자가 회원의 상태를 변경하는 함수
 * @param {*} uid 
 * @param {*} nextActive 
 */
export const updateUserActive = async (uid, nextActive) => {
  try {
    const userRef = doc(db, COLLECTION_NAME, uid);

    await updateDoc(userRef, {
      active: nextActive,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * - 최근 로그인 시간을 업데이트하는 함수
 * @param {*} uid 
 */
export const updateLastLogin = async (uid) => {
  try {
    const userRef = doc(db, COLLECTION_NAME, uid);
    await updateDoc(userRef, {
      lastLoginAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

/**
 * - userId로 특정 유저를 조회하는 함수
 * @param {*} userId 
 * @returns 
 */
export const getUserByUserId = async (userId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", Number(userId)),
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