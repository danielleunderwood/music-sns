const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    return undefined;
  }

  return navigator.serviceWorker.register(
    "/music-sns/firebase-messaging-sw.js",
    {
      scope: "/music-sns/",
    }
  );
};

export default registerServiceWorker;
