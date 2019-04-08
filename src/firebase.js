import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var config = {
    apiKey: "AIzaSyDUvLfI8hVBCh4P--LLtAerPn0bDop2goM",
    authDomain: "realtime-chat-app88.firebaseapp.com",
    databaseURL: "https://realtime-chat-app88.firebaseio.com",
    projectId: "realtime-chat-app88",
    storageBucket: "realtime-chat-app88.appspot.com",
    messagingSenderId: "917157966955"
};
firebase.initializeApp(config);

export default firebase; 
