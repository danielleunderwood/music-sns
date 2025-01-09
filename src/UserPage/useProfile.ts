import useAsyncEffect from "../hooks/useAsyncEffect";
import supabase from "../utils/supabase";

const useProfile = (userId: string) => {
  return useAsyncEffect({
    effect: async () => {
      const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", userId)
        .range(0, 0);

      if (!data) {
        return undefined;
      }

      const [profile] = data;

      return profile;
    },
    deps: [],
    initialValue: undefined,
  });
};

export default useProfile;
