import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { getUserByUid } from "../services/userService";
import { setCurrentUser, clearUser } from "../store/userSlice";

function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        dispatch(clearUser());
        return;
      }

      const userData = await getUserByUid(authUser.uid);
      dispatch(setCurrentUser(userData));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

export default AuthInitializer;
