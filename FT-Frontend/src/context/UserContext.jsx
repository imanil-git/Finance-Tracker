import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UseProvider = ({ children }) => {
    const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
