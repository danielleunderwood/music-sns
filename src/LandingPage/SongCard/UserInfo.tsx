import { Link } from "react-router";
import useAsyncEffect from "../../hooks/useAsyncEffect";
import { Status } from "../../types/status";
import supabase from "../../utils/supabase";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

interface UserInfoProps {
  /** A UUID. */
  userId: string;
}

function UserInfo({ userId }: UserInfoProps) {
  const { value: profile, status } = useAsyncEffect({
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
    return (
      <div
        aria-busy
        aria-hidden
        className="text-sm bg-gray-500 animate-pulse rounded-sm h-4 w-1/4"
      />
    );
  }

  if (status === Status.Error || !profile) {
    return (
      <div
        aria-description="Failed to load user info"
        className="text-sm bg-red-300 dark:bg-red-700 rounded-sm"
      />
    );
  }

  return (
    <div className="flex gap-1">
      {"From "}
      <Link className="flex items-center font-bold gap-1" to={`user/${userId}`}>
        {profile.display_name}
        <ArrowRightCircleIcon className="h-4" />
      </Link>
    </div>
  );
}

export default UserInfo;
