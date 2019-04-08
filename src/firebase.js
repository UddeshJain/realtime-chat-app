import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var config = {
    apiKey: "Put your api key of firebase",
    authDomain: "Put link of auth domain here",
    databaseURL: "Put your database url here",
    projectId: "project id from firebase goes here",
    storageBucket: "Storage bucket from firebase goes here",
    messagingSenderId: "Here goes message sender id, it will bw a number"
};
firebase.initializeApp(config);

export default firebase; 