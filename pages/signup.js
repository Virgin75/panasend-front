import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext, useEffect } from 'react';
import { UserContext, UserDispatchContext } from '../userContext';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import ls from 'localstorage-slim';



export default function Signup() {

  const [email, setEmail] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const handleSubmit = async(e) => {
    e.preventDefault();

    var requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"email": email, "password": password, "first_name": fName, "last_name": lName}),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/users/signup", requestOptions)
      const res_data = await res.json()
      ls.set('onboardingDone', false)
      ls.set('user_details', {
        first_name: res_data.user.first_name,
        last_name: res_data.user.last_name,
        email: res_data.user.email
      })
      Router.push('/onboarding')
    }
    catch (bug) {
      setError('An error occured while signup. Please check your details.')
    }
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Signup to Panasend</title>
        <meta name="description" content="Log in to your Panasend account." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Signup to Panasend
        </h1>

        <div className="form">
          <form onSubmit={handleSubmit}>
          <div className="input-container">
              <label>First name </label>
              <input type="text" name="firstname" value={fName} onChange={e => setFName(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>Last name </label>
              <input type="text" name="lastname" value={lName} onChange={e => setLName(e.target.value)} required />
            </div>
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
          <Link href="/login">
          <a>Already registered? Log in</a>
        </Link>
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
