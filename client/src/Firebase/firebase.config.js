import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

/** Null when env is missing or init fails — public pages still render. */
let auth = null;
let analytics = null;

const hasCoreConfig =
  typeof firebaseConfig.apiKey === "string" &&
  firebaseConfig.apiKey.length > 0 &&
  typeof firebaseConfig.projectId === "string" &&
  firebaseConfig.projectId.length > 0 &&
  typeof firebaseConfig.appId === "string" &&
  firebaseConfig.appId.length > 0;

if (hasCoreConfig) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    const hasAnalyticsConfig =
      typeof firebaseConfig.measurementId === "string" &&
      firebaseConfig.measurementId.length > 0;

    if (hasAnalyticsConfig) {
      isSupported()
        .then((supported) => {
          if (!supported) return;
          try {
            analytics = getAnalytics(app);
          } catch (e) {
            console.warn("[FineAnswer] Analytics disabled:", e);
          }
        })
        .catch(() => {});
    }
  } catch (e) {
    console.error("[FineAnswer] Firebase initialization failed:", e);
    auth = null;
    analytics = null;
  }
} else {
  console.warn(
    "[FineAnswer] Firebase env missing (need at least VITE_APIKEY, VITE_PROJECTID, VITE_APPID). Auth/analytics disabled."
  );
}

export { analytics, auth };
export default auth;