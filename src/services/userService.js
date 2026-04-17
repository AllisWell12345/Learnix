import { db } from "../firebase/config.js";
import { doc, setDoc, getDoc, orderBy, getDocs, collection, query, where } from "firebase/firestore";
import { getDataId } from "./getIdService.js";

const COLLECTION_NAME = "users";

// 회원가입과 동시에 파이어스토어에 유저 정보를 생성하여 저장하는 함수
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

// 현재 로그인한 유저의 정보를 읽어오기 위해 만들었던 단일 조회 함수
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

// 관리자의 회원 관리에서 사용하기 위해 만든 모든 회원을 조회하는 함수
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

// // 관리자가 회원 관리 탭에서 회원들을 role 값에 따라 필터하기 위함
// export const getUsersByRole = async (role) => {
//   try {
//     const q = query(
//       collection(db, COLLECTION_NAME),
//       where("role", "==", role),
//       orderBy('userId', 'desc')
//     );

//     const querySnapshot = await getDocs(q);

//     const users = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//     }))

//     return users;

//   } catch (error) {
//     throw error;
//   }
// };