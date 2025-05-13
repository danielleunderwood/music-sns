import useStore from "../../store";
import supabase from "../../utils/supabase";
import useAsyncEffect from "../useAsyncEffect";
import getOrDeferMessagingToken from "./getOrDeferMessagingToken";
import registerServiceWorker from "./registerServiceWorker";

const useSession = () => {
  const { setSession } = useStore();

  return useAsyncEffect({
    effect: async () => {
      const sessionData = await supabase.auth.getSession();

      setSession(sessionData.data.session);

      supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);

        if (!session) {
          return;
        }

        const serviceWorkerRegistration = await registerServiceWorker();

        if (serviceWorkerRegistration) {
          await getOrDeferMessagingToken(
            serviceWorkerRegistration,
            session.user.id
          );
        }
      });
    },
    deps: [],
    initialValue: null,
  });
};

export default useSession;
