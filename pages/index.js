
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router'
import IsLoggedInOrRedirect from '../components/isLoggedIn';
import ls from 'localstorage-slim';
import NavigationMenu from '../components/NavigationMenu';
import TwoColumnsLayout from '../components/TwoColumnsLayout';


export default function Home() {

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  useEffect(() => {
    let user = getCookieValue("access")
    let wks_id = ls.get('first_wks')
    if (user == undefined || user == null || user == '') {
      Router.push('/login')
    }
    else {
      Router.push('/wks/' + wks_id + '/campaigns')
    }
  }, [])

  return (
    <></>
  )
}

