import * as firebase from "firebase/app";
import "firebase/messaging";

let firebaseConfig = {
  apiKey: "AIzaSyCbraR61uAsM8FgEt9H0f39FSo8oowh8Og",
  authDomain: "pwa-test-d6ae0.firebaseapp.com",
  databaseURL: "https://pwa-test-d6ae0.firebaseio.com",
  projectId: "pwa-test-d6ae0",
  storageBucket: "pwa-test-d6ae0.appspot.com",
  messagingSenderId: "518693018206",
  appId: "1:518693018206:web:f71c9c1cb960a011b932cf"
};
export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

export const askForPermissioToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging();
    // messaging.usePublicVapidKey(
    //   // Project Settings => Cloud Messaging => Web Push certificates
    //   "BMHprZ5dsLF2ZxleO7q7XfNJQPO4xh8mHijvLBl7HYHllSkFBFVmhnZ2eDldPVPyRpTJUDNUurWcOvSFaU14cZg"
    // );
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);
    localStorage.setItem('notify_token', token);
    return token;
  } catch (error) {
    console.error(error);
  }
};


