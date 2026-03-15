import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { IUserContext } from "./IUserContext";

const UserContext = createContext<null | IUserContext>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
    const user = useState({})

    return <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
}

export default function useUserContext() {
    const user = useContext(UserContext);
    if (!user) throw new Error("user not available out of context");
    return user;
}