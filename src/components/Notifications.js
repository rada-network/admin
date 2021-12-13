import { useNotifications } from "@usedapp/core";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  const { notifications } = useNotifications();

  useEffect(() => {
    notifications.forEach((notification) => {
      toast(`${notification.type}`);
    });
  }, [notifications]);

  return (
    <ToastContainer autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />
  );
};

export default Notifications;
