import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import Router, { useRouter } from 'next/router'
import Login from '../pages/login';
import ls from 'localstorage-slim';


export default function IsLoggedIn({ children }) {

  // Manage the auth token
  useEffect(() => {
    let user = ls.get('user')
    let onboardingDone = ls.get('onboardingDone')
    console.log(user)
    if (user == undefined || user == null) {
      Router.push('/login')
    }
    else if (!onboardingDone) {
        Router.push('/onboarding')
    }
    else if (onboardingDone && Router.pathname == "/onboarding") {
        Router.push('/')
    }
  }, [])
  // End of auth token management


    return <div>{children}</div>
}
