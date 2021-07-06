import { createContext, useContext } from "react";

const MyContent = createContext({
  text: 0,
});

const useMyContent = () => useContext(MyContent);

export { MyContent, useMyContent };
