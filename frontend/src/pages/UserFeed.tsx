import React from "react";
import { UserContext } from "../context/UserContext";
import { Editor } from "../components/TextEditor";
import { UserContextType } from "../types/UserContext";

export const UserFeed: React.FC = () => {
  const userContext = React.useContext(UserContext) as UserContextType;
  const { user } = userContext;

  return (
    <div>
      <h1>Welcome, {user!.name}</h1>
      <div className="max-w-2xl mt-8 mb-4">
        <Editor />
      </div>
    </div>
  );
};
