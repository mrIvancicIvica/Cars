/* eslint-disable import/no-extraneous-dependencies */

import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCWPR6YxgvctMD-zXR_WrSUnnjDWMVUFnI',
  authDomain: 'cars-a0baf.firebaseapp.com',
  databaseURL:
    'https://cars-a0baf-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cars-a0baf',
  storageBucket: 'cars-a0baf.appspot.com',
  messagingSenderId: '125424695383',
  appId: '1:125424695383:web:c86aad171df003518e4b12',
};
firebase.initializeApp(config);

const car = firebase.firestore().collection('cars');
const cars = firebase.firestore().collection('cars').orderBy('brand', 'asc');
const fb = { cars, car };

export default fb;
