import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyCO__d0ZevYj_heN1OkgICJcyfs01Ear-w",
  authDomain: "clique-52833.firebaseapp.com",
  projectId: "clique-52833",
  storageBucket: "clique-52833.appspot.com",
  messagingSenderId: "336766890285",
  appId: "1:336766890285:web:33a121aea598e05a2723a4",
  measurementId: "G-LZFZNFT6N3"
};

//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one

}

const firestoreRef = firebase.firestore();
const firebaseStorageRef = firebase.storage();

export {firestoreRef, firebaseStorageRef};
