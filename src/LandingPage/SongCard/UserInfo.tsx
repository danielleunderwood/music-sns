import { Alert, LinearProgress } from "@mui/material";
import useAsyncEffect from "../../hooks/useAsyncEffect";
import { Status } from "../../types/status";
import supabase from "../../utils/supabase";

interface UserInfoProps {
  /** A UUID. */
  userId: string;
}
function UserInfo({ userId }: UserInfoProps) {
  const { value, status } = useAsyncEffect({
    effect: async () => {
      const result = await supabase.from("profiles").select().eq("id", userId);

      const { data } = result;

      if (!data) {
        return undefined;
      }

      const [profile] = data;

      return profile;
    },
    deps: [],
    initialValue: undefined,
  });

  if (status === Status.Loading) {
    return <LinearProgress />;
  }

  if (status === Status.Error || !value) {
    return <Alert severity="error">Failed to load poster info.</Alert>;
  }

  return <div className="text-sm text-gray-500">{value.display_name}</div>;
}

export default UserInfo;
