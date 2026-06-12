import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";


import { createContext, useCallback, useEffect, useState } from "react";

import { API_BASE_URL } from "../../config/api";
import auth from "../../Firebase/firebase.config";
import { clearToken, getToken } from "../../utils/tokenStorage";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Creating The Function Of The USER
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login Function
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google SignIn
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // Logout Function
  const logOut = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);
      // Clear token from both stores
      clearToken();
      localStorage.removeItem("Access-Token");
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get Current User from Backend
  const getCurrentUser = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (!response.ok) {
        // Token invalid, clear it
        clearToken();
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return null;
      }

      const { data, isAdmin: adminStatus } = result;
      setUser(data);
      
      // Set admin status from backend response only
      // Backend can return isAdmin at root level OR in data object
      // Priority: root level isAdmin > data.isAdmin > false
      const adminValue = typeof adminStatus === 'boolean' 
        ? adminStatus 
        : (typeof data?.isAdmin === 'boolean' ? data.isAdmin : false);
      
      setIsAdmin(adminValue);
      
      // Don't store user data in localStorage - always fetch from backend
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Get current user error:", error);
      clearToken();
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return null;
    }
  }, []);

  // Apply backend auth response instantly (avoids extra /auth/me roundtrip on login)
  const applyBackendAuth = useCallback((backendUser, adminStatus) => {
    setUser(backendUser || null);
    setIsAdmin(!!adminStatus);
    setLoading(false);
  }, []);

  //   Update Profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // State Management - Get current user from backend on mount
  useEffect(() => {
    let cancelled = false;

    const bootstrapAuth = async () => {
      const token = getToken();
      if (!token) {
        if (!cancelled) {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }
      await getCurrentUser();
    };

    bootstrapAuth();

    // Never leave the app stuck on a spinner if /auth/me hangs
    const timeoutId = window.setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 10000);

    const unsubscribe = onAuthStateChanged(auth, async () => {
      if (cancelled) return;
      const token = getToken();
      if (token) await getCurrentUser();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [getCurrentUser]);

  const authInfo = {
    user,
    isAdmin,
    createUser,
    logIn,
    logOut,
    loading,
    googleSignIn,
    updateUserProfile,
    getCurrentUser,
    applyBackendAuth,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;