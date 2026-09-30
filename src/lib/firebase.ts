import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

export const firebaseConfig = {
  projectId: "wildlife-ef308",
  appId: "1:1017776899412:web:d0bdfd699f4dee1586b4c1",
  apiKey: "AIzaSyC-pzCUqUN0ZCfXlBAnWQcueknlCSmad_c",
  authDomain: "wildlife-ef308.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-wildearthcinemaw-d8c19288-db5e-400d-b32a-849629a849d7",
  storageBucket: "wildlife-ef308.firebasestorage.app",
  messagingSenderId: "1017776899412",
  oAuthClientId: "1017776899412-n79duta8kgin8eskfdp0oap9aa8vhpaj.apps.googleusercontent.com",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
};
export type { FirebaseUser };
