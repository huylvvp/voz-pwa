importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

let firebaseConfig = {
  apiKey: "AIzaSyCbraR61uAsM8FgEt9H0f39FSo8oowh8Og",
  authDomain: "pwa-test-d6ae0.firebaseapp.com",
  databaseURL: "https://pwa-test-d6ae0.firebaseio.com",
  projectId: "pwa-test-d6ae0",
  storageBucket: "pwa-test-d6ae0.appspot.com",
  messagingSenderId: "518693018206",
  appId: "1:518693018206:web:f71c9c1cb960a011b932cf"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

console.log('firebase service worker run');

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

