import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import ls from 'localstorage-slim';


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const handleSubmit = async(e) => {
    e.preventDefault();

    var requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"email": email, "password": password}),
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/users/signin", requestOptions)
      const res_data = await res.json()
      ls.set('user', res_data.access, { ttl: 3600 })
      ls.set('onboardingDone', res_data.user.onboarding_done)
      Router.push('/')
    }
    catch (bug) {
      setError('An error occured while signin. Maybe your credentials are invalid?')
    }
    
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

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email </label>
              <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <span style={{'color': 'red'}}>{error}</span>
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
