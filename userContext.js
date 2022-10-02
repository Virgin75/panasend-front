import React, { createContext, useState, useEffect, useLayoutEffect } from "react";
import Router, { useRouter } from 'next/router'
import useDidMountEffect from './useDidMountEffect'

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const UserContext = createContext(undefined)
const UserDispatchContext = createContext(undefined)

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }) {
  const [user, setUser] = useState({
    token: "",
    isLoggedIn: false,
  })
  const [onboardingDone, setOnboardingDone] = useState(false)
console.log(user)

useEffect(() => {
  
    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    )
    const token = getCookieValue('access')
    if (token) {
        setUser({   
          token: token,
          isLoggedIn: true
        })
    }
    
}, []);

// If user is not logged in or not on signup page, we redirect him to login page
useDidMountEffect(() => {
  if (!user.isLoggedIn && Router.pathname != "/signup") {
    Router.push('/login')
  }
  
}, [user]);

  return (
    <UserContext.Provider value={{user, onboardingDone}}>
      <UserDispatchContext.Provider value={{setUser, setOnboardingDone}}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };