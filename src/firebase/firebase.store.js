/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyBKWZGwAvZ1dkIjLjd9ddLhB9EFJAGIldc',
  authDomain: 'carss-965a6.firebaseapp.com',
  databaseURL:
    'https://carss-965a6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'carss-965a6',
  storageBucket: 'carss-965a6.appspot.com',
  messagingSenderId: '1072366047680',
  appId: '1:1072366047680:web:fe101ce1cfe0f912653825',
};
firebase.initializeApp(config);

const cars = firebase.database().ref('cars');

const fb = { cars };

export default fb
