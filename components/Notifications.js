import { useNotifications } from "@usedapp/core";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Notifications = () => {
  const { notifications } = useNotifications();

  useEffect(() => {
    notifications.map((notification) => {
      console.log("notification", notification);
      toast(`${notification.type}`);
    });
  }, [notifications]);

  return (
    <ToastContainer autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />
  );
};

export default Notifications;
