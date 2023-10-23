import { useContext } from "react";
import MessagesOpenContext from "../context/MessagesContext";

export default function useDrawer() {
  const { opened, setOpened } = useContext(MessagesOpenContext);
  const open = () => {
    setOpened(true);
  };
  const close = () => {
    setOpened(false);
  };

  return { opened, open, close };
}
