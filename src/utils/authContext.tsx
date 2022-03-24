import { User } from "@prisma/client";
import { createContext, useContext } from "react";

export const AuthContext = createContext<User | undefined>(undefined);

export const AuthProvider = (props: any) => {
  return (
    <AuthContext.Provider value={props.user}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const user = useContext(AuthContext);
  return user!;
};
