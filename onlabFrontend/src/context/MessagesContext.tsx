import { createContext } from "react";

interface IMessagesOpenedContext {
  opened: boolean;
  setOpened: (open: boolean) => void;
}

const MessagesOpenContext = createContext<IMessagesOpenedContext>({
  opened: false,
  setOpened: () => {},
});

export default MessagesOpenContext;
