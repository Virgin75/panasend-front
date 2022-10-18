import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link'
import IsLoggedInOrRedirect from '../components/isLoggedIn';
import ls from 'localstorage-slim';
import Router, { useRouter } from 'next/router'




export default function Onboarding() {

  //Company fields
  const [company, setCompany] = useState('') // And also Workspace field
  const [smtp, setSmtp] = useState('SES')
  //Workspace fields
  const [address, setAddress] = useState('')
  const [autoUtm, setAutoUtm] = useState(true)
  const [logo, setLogo] = useState('https://www...')

  const [error, setError] = useState('')


  const logOut = () => {
    ls.clear()
    document.cookie.split(';').forEach(function(c) {
      document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    });
    Router.push('/login')
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const token = ls.get('user')

    var companyOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({'name': company, 'smtp': smtp}),
    };
    var workspaceOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({'name': company, 'address': address, 'auto_utm_field': autoUtm}),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/users/companies", companyOptions)
      const company_data = await res.json()
      console.log(company_data)

      const res2 = await fetch("http://127.0.0.1:8000/users/workspaces", workspaceOptions)
      const workspace_data = await res2.json()
      console.log(workspace_data)

      ls.set('onboardingDone', true)
      ls.set('first_wks', workspace_data.id)
      Router.push('/wks/'+workspace_data.id+'/campaigns')
    }
    catch (bug) {
      setError('An error occured while completing your onboarding.')
    }
    


  }

  return (
    <IsLoggedInOrRedirect>
      <div className={styles.container}>
      <Head>
        <title>Onboarding</title>
        <meta name="description" content="Log in to your Panasend account." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a onClick={logOut}>Log out</a>
        <h1 className={styles.title}>
          Let's get started
        </h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
          <div className="input-container">
              <label>Your company name </label>
              <input type="text" name="company" value={company} onChange={e => setCompany(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>What is your SMTP provider?</label>
              <select type="text" name="smtp" value={smtp} onChange={e => setSmtp(e.target.value)}>
                <option value="SES">Amazon Web Services SES</option>
                <option value="CST">Custom SMTP</option>
              </select>
            </div>
            <div className="input-container">
              <label>Postal address </label>
              <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>
              <input type="checkbox" name="utm" checked={autoUtm} onChange={() => setAutoUtm(!autoUtm)} required />
              Automatically add UTM to all of your links? </label>
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
    </IsLoggedInOrRedirect>
    
  )
}
