import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC-QNVYYgXNMxPcODtsDYxeR2oYNT1rq3U',
  authDomain: 'meteo-journey.firebaseapp.com',
  projectId: 'meteo-journey',
  storageBucket: 'meteo-journey.appspot.com',
  messagingSenderId: '114629222250',
  appId: '1:114629222250:web:536fb1b4728be11ff1cf13',
  measurementId: 'G-JHQS7YZ9KZ',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
