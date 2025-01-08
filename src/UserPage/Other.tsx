import { Alert, CircularProgress } from "@mui/material";
import useProfile from "./useProfile";
import Card from "../components/Card";
import Button from "../components/Button";
import useAsyncEffect from "../hooks/useAsyncEffect";
import supabase from "../utils/supabase";
import useStore from "../store";
import { Status } from "../types/status";

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
    <CircularProgress />;
  }

  if (!profile) {
    return (
      <Alert severity="info">
        This user does not exist or is invisible to you.
      </Alert>
    );
  }

  if (subscription) {
    return (
      <Card>
        <h1 className="flex justify-center p-4">
          You are following {profile.display_name}.
        </h1>
      </Card>
    );
  }

  return (
    <Card>
      <form
        onSubmit={async () => {
          await supabase.from("subscriptions").insert({
            subscriber_id: session.user.id,
            subscribee_id: userId,
          });
        }}
      >
        <h1 className="flex justify-center p-4">
          Follow {profile.display_name}?
        </h1>
        <Button type="submit">Follow</Button>
      </form>
    </Card>
  );
}

export default Other;
