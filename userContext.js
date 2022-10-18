import React, { createContext, useState, useEffect, useLayoutEffect } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const UserContext = createContext(undefined)
const UserDispatchContext = createContext(undefined)

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }) {
  const [user, setUser] = useState({
    first_name: "a",
    last_name: "",
    email: ""
  })
  const [workspace_id, setWorkspaceID] = useState("")
  const [company_id, setCompanyID] = useState("")


  return (
    <UserContext.Provider value={{user, workspace_id, company_id}}>
      <UserDispatchContext.Provider value={{setUser, setWorkspaceID, setCompanyID}}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };