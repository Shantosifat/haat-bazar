import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   create USer/ signup
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   google signin
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

//   logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

//   update profile
const updateUserProfile = (profileInfo)=>{
    return updateProfile(auth.currentUser, profileInfo)
}

// to keep the user after reload
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    login,
    googleSignin,
    logOut,
    updateUserProfile
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
