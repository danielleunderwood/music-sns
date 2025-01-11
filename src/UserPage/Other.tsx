import { Alert, CircularProgress } from "@mui/material";
import useProfile from "./useProfile";
import Card from "../components/Card";
import Button from "../components/Button";
import useAsyncEffect from "../hooks/useAsyncEffect";
import supabase from "../utils/supabase";
import useStore from "../store";
import { Status } from "../types/status";
import Posts from "../LandingPage/Posts";

interface OtherProps {
  /** A UUID. */
  userId: string;
}

function Other({ userId }: OtherProps) {
  const { session } = useStore();

  const { value: profile, status: profileRetrievalStatus } = useProfile(userId);

  const { value: subscription, status: subscriptionRetrievalStatus } =
    useAsyncEffect({
      effect: async () => {
        const subscription = await supabase
          .from("subscriptions")
          .select()
          .eq("subscribee_id", userId);

        return subscription.data?.length;
      },
      deps: [],
      initialValue: undefined,
    });

  if (!session) {
    return (
      <Alert severity="error">Cannot view profiles when not logged in.</Alert>
    );
  }

  if (profileRetrievalStatus === Status.Error) {
    return (
      <Alert severity="error">
        Failed to retrieve profile. Please try again later.
      </Alert>
    );
  }

  if (subscriptionRetrievalStatus === Status.Error) {
    return (
      <Alert severity="error">
        Failed to retrieve subscription. Please try again later.
      </Alert>
    );
  }

  if (
    profileRetrievalStatus === Status.Loading ||
    subscriptionRetrievalStatus === Status.Loading
  ) {
    return <CircularProgress />;
  }

  if (!profile) {
    return (
      <Alert severity="info">
        This user does not exist or is invisible to you.
      </Alert>
    );
  }

  if (!subscription) {
    const handleFollow = async () => {
      await supabase.from("subscriptions").insert({
        subscriber_id: session.user.id,
        subscribee_id: userId,
      });
    };

    return (
      <Card>
        <form action={handleFollow}>
          <h1 className="flex justify-center p-4">
            Follow {profile.display_name}?
          </h1>
          <Button type="submit">Follow</Button>
        </form>
      </Card>
    );
  }

  return (
    <div>
      <div className="fixed h-max bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-2">
        Viewing <span className="font-bold">{profile.display_name}</span>'s
        posts
      </div>
      <div className="h-12"></div>
      <Posts userId={userId} />
    </div>
  );
}

export default Other;
