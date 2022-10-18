import Head from 'next/head'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import ls from 'localstorage-slim';
import IsLoggedInOrRedirect from '../../../components/isLoggedIn';
import TwoColumnsLayout from '../../../components/TwoColumnsLayout';
import NavigationMenu from '../../../components/NavigationMenu';

export default function NewWorkspace({ workspaces, current_wks }) {
  const router = useRouter();

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')


  const handleSubmit = async(e) => {
    e.preventDefault();

    var requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookieValue("access")
      },
      body: JSON.stringify({"name": name, "address": address}),
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/users/workspaces", requestOptions)
      const res_data = await res.json()
      router.replace(router.asPath);
      setError('Workspace created successfully.')
    }
    catch (bug) {
      setError('An error occured while signin. Maybe your credentials are invalid?')
    }
    
  }


  return (
    <IsLoggedInOrRedirect>
    <div>
    <Head>
        <title>Create a new workspace</title>
        <meta name="description" content="Create a new workspace." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <TwoColumnsLayout>
      <NavigationMenu workspaces={workspaces} current_wks={current_wks}/>

      <main>
        <h1>
          Create a new Workspace
        </h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Name of the workspace </label>
              <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>Postal address </label>
              <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
            <span style={{'color': 'red'}}>{error}</span>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>

      </main>
    </TwoColumnsLayout>
    

    <footer>
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

export async function getServerSideProps(context) {
  console.log(context.params['wks_id'])
    // Fetch data from external API
    var requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + context.req.cookies['access'],
      }
    };
    const res = await fetch('http://127.0.0.1:8000/users/workspaces', requestOptions)
    const workspaces = await res.json()
    let current_wks = {}

    for (let i=0; i<workspaces.length; i++) {
      if (workspaces[i].id == context.params['wks_id']) {
        current_wks['id'] = workspaces[i].id
        current_wks['name'] = workspaces[i].name
      }
    }
  
    // Pass data to the page via props
    return { props: { workspaces, current_wks } }
  }