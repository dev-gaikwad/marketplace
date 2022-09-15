import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB-tMW_bDAzUCjB7l3fE8i9qrXbSEcuO28',
  authDomain: 'marketplace-app-6a1d8.firebaseapp.com',
  projectId: 'marketplace-app-6a1d8',
  storageBucket: 'marketplace-app-6a1d8.appspot.com',
  messagingSenderId: '354889420686',
  appId: '1:354889420686:web:a59c30ce1bfb662ba0dedf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore();
