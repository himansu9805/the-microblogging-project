import React from "react";
import { UserContextType } from "../types/UserContext";

export const UserContext = React.createContext<UserContextType | null>(null);
