import useStore from "../store";
import { useParams } from "react-router";
import Self from "./Self";
import Other from "./Other";

function UserPage() {
  const { userId } = useParams();

  const { session } = useStore();

  if (userId === session?.user.id) {
    return <Self />;
  }

  return <Other userId={userId ?? ""} />;
}

export default UserPage;
