import React, { createContext, useState, useEffect } from "react";
import Router, { useRouter } from 'next/router'

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }) {
  const [user, setUser] = useState({
    token: "",
    isLoggedIn: false
  });

  console.log(user)

useEffect(() => {
    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    )
    const token = getCookieValue('access')
    if (token) {
        setUser({token: token, isLoggedIn: true})
    }
    
}, []);

useEffect(() => {
  if (!user.isLoggedIn && Router.pathname != "/signup") {
    Router.push('/login')
  }
  
}, [user]);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };