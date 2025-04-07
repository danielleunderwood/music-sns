import { Alert } from "@mui/material";
import TextButton from "../components/TextButton";
import { useState } from "react";

function NotificationsStatus() {
  const [permission, setPermission] = useState(Notification.permission);

  if (permission === "default") {
    return (
      <Alert>
        Want to get notifications?
        <TextButton
          onClick={async () => {
            setPermission(await Notification.requestPermission());
          }}
        >
          Click here
        </TextButton>
      </Alert>
    );
  }

  if (permission === "denied") {
    return <Alert>Notifications disabled.</Alert>;
  }

  return <></>;
}

export default NotificationsStatus;
