import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext } from 'react';
import { UserContext, UserDispatchContext } from '../userContext';
import Link from 'next/link'



export default function Onboarding() {

  const user = React.useContext(UserContext)
  const setUser = useContext(UserDispatchContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logOut = () => {
    document.cookie = 'access=; Max-Age=0'
    setUser({token:'', isLoggedIn:false})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Onboarding</title>
        <meta name="description" content="Log in to your Panasend account." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a onClick={logOut}>Log out</a>
        <h1 className={styles.title}>
          Onboarding
        </h1>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Virgin
        </a>
      </footer>
    </div>
  )
}
