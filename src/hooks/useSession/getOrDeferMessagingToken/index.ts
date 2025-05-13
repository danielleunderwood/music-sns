import supabase from "../../../utils/supabase";
import getMessagingTokenFromFirebase from "./getMessagingTokenFromFirebase";

const getAndSaveToken = async (
  serviceWorkerRegistration: ServiceWorkerRegistration,
  userId: string
) => {
  const token = await getMessagingTokenFromFirebase(serviceWorkerRegistration);

  if (token) {
    await supabase
      .from("fcm_tokens")
      .update({ token: token })
      .eq("user_id", userId);
  }
};

const getTokenOnStateChange = (
  serviceWorkerRegistration: ServiceWorkerRegistration,
  userId: string
) => {
  serviceWorkerRegistration.installing!.onstatechange = async (e) => {
    const state = (e?.target as any).state;

    if (state !== "installed") {
      return "";
    }

    return getAndSaveToken(serviceWorkerRegistration, userId);
  };
};

const getOrDeferMessagingToken = async (
  serviceWorkerRegistration: ServiceWorkerRegistration,
  userId: string
): Promise<void> => {
  if (Notification.permission === "granted") {
    if (serviceWorkerRegistration.installing) {
      getTokenOnStateChange(serviceWorkerRegistration, userId);

      return;
    }

    await getAndSaveToken(serviceWorkerRegistration, userId);

    return;
  }

  const notificationsPermission = await navigator.permissions.query({
    name: "notifications",
  });

  notificationsPermission.onchange = () => {
    getAndSaveToken(serviceWorkerRegistration, userId);
  };

  return;
};

export default getOrDeferMessagingToken;
