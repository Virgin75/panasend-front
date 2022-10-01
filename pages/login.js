import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext, useEffect } from 'react';
import { UserContext, UserDispatchContext } from '../userContext';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'



export default function Login() {

  const user = React.useContext(UserContext)
  const setUser = useContext(UserDispatchContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user.isLoggedIn) {
      Router.push('/onboarding')
    } 
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();

    var requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"email": email, "password": password}),
    };

    fetch("http://127.0.0.1:8000/users/signin", requestOptions)
    .then(response => response.json())
    .then(result => {
      setUser({token: result.access, isLoggedIn: true})

    })
    .catch(error => console.log('error', error));
  }

  const onEmailChange = e => {
    setEmail(e.target.value);
  }

  const onPasswordChange = e => {
    setPassword(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login to Panasend</title>
        <meta name="description" content="Log in to your Panasend account." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Login to Panasend
        </h1>
        <p>{user.isLoggedIn}</p>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email </label>
              <input type="text" name="email" value={email} onChange={onEmailChange} required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="password" value={password} onChange={onPasswordChange} required />
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>

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
