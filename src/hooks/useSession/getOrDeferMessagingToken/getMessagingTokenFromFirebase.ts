import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const vapidKey =
  "BLx-OgwdjnMSY01WJwYpT8GwCLXZCaeby9fyrA3WrQ8otlaBHM8a7LSjY_e6koc1_3p9ErmgwdyFmSr07M9LD7w";

const firebaseConfig = {
  apiKey: "AIzaSyASfdt2aEbkdOc06TkrrWjcrsSWK3L184o",
  authDomain: "music-sns-932cc.firebaseapp.com",
  projectId: "music-sns-932cc",
  storageBucket: "music-sns-932cc.firebasestorage.app",
  messagingSenderId: "873188144165",
  appId: "1:873188144165:web:d387a00a890b59a0517bcc",
  measurementId: "G-9G97F2PM33",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

const getMessagingTokenFromFirebase = async (
  serviceWorkerRegistration: ServiceWorkerRegistration
) =>
  getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration,
  });

export default getMessagingTokenFromFirebase;
