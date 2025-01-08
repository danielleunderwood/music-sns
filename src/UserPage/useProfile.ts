import useAsyncEffect from "../hooks/useAsyncEffect";
import { Tables } from "../utils/database.types";
import supabase from "../utils/supabase";

const useProfile = (userId: string) => {
  return useAsyncEffect({
    effect: async () => {
      const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", userId)
        .range(0, 0);

      if (data) {
        const [profile] = data as Tables<"profiles">[];

        return profile;
      }

      throw Error("Failed to retrieve profile");
    },
    deps: [],
    initialValue: undefined,
  });
};

export default useProfile;
