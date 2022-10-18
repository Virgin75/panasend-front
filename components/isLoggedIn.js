import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import Router, { useRouter } from 'next/router'
import Login from '../pages/login';
import ls from 'localstorage-slim';


export default function IsLoggedIn({ children }) {

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )
  
  // Manage the auth token
  useEffect(() => {
    let user = getCookieValue("access")
    let onboardingDone = ls.get('onboardingDone')
    let workspaces = ls.get('workspace_ids')

    console.log(user)
    if (user == undefined || user == null || user == '') {
      Router.push('/login')
    }
    else if (!onboardingDone) {
        Router.push('/onboarding')
    }
    else if (onboardingDone && Router.pathname == "/onboarding") {
        console.log(workspaces)
        Router.push('/wks/'+workspaces[0][0])
    }
  }, [])
  // End of auth token management


    return <div>{children}</div>
}
