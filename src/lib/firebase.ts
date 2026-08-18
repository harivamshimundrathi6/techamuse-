import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAWFcLsXpu41TjLcsj1-DRJoL-LN4M65zg",
  authDomain: "techamuse.firebaseapp.com",
  projectId: "techamuse",
  storageBucket: "techamuse.firebasestorage.app",
  messagingSenderId: "982109414051",
  appId: "1:982109414051:web:0877529575aa2214321516",
  measurementId: "G-00MKWQPVS4",
  databaseURL: "https://techamuse-default-rtdb.firebaseio.com" // Explicitly adding for RTDB
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

export { db };
