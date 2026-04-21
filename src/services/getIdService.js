import { db } from "../firebase/config.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/**
 * - 각 컬렉션의 데이터들에게 생성 순서대로 순차적으로 고유 id 값을 부여하기 위해 카운트를 계산하는 함수
 * @param {*} DataName 
 * @returns 
 */
export const getDataId = async (DataName) => {
  const dataIdRef = doc(db, "counts", "dataIds");
  const dataIdSnap = await getDoc(dataIdRef);
  const initialData = {
    user: 0,
    lecture: 0,
    video: 0,
    cart: 0,
    attending: 0,
    template: 0,
    project: 0,
    interview: 0,
    question: 0,
    answer: 0,
  };

  if (!dataIdSnap.exists()) {

    const nextId = 1;

    await setDoc(dataIdRef, {
      ...initialData,
      [DataName]: nextId,
    });

    return nextId;
  }

  const idData = dataIdSnap.data();
  const currentId = idData[DataName];
  const nextId = currentId + 1;

  await updateDoc(dataIdRef, {
    [DataName]: nextId,
  });

  return nextId;
};