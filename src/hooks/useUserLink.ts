import useStore from "../store";

const useUserLink = () => {
  const { session } = useStore();

  if (!session) {
    return "";
  }

  return ["user", session.user.id].join("/");
};

export default useUserLink;
