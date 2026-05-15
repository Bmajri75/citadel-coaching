// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sauvegarde d'une réservation (appelable après paiement Stripe webhook si besoin)
export const sauvegarderReservation = async (reservationData) => {
  try {
    const docRef = await addDoc(collection(db, 'reservations'), {
      nom: reservationData.nom,
      email: reservationData.email,
      tel: reservationData.tel,
      discipline: reservationData.discipline,
      date: reservationData.date,
      heure: reservationData.heure,
      message: reservationData.message || '',
      montant: reservationData.amount || 90,
      paymentId: reservationData.paymentId || '',
      statut: 'confirmé',
      creeLe: serverTimestamp(),
    });
    console.log('✅ Réservation sauvegardée dans Firebase avec ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde Firebase:', error);
    return { success: false, error };
  }
};

export { db };
