import { db } from "../firebase/config.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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
    question: 0,
    answer: 0,
    comment: 0,
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