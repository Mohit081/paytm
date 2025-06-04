import { createContext, useContext, useState } from "react";
import React from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [sender,setSender] = useState({
    name:"",
    userId:""
  })
  return (
    <UserContext.Provider value={{ user, setUser,sender,setSender }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
