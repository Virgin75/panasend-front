import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router'
import IsLoggedInOrRedirect from '../components/isLoggedIn';
import ls from 'localstorage-slim';


export default function Home({ data }) {

  const logOut = () => {
    ls.set('user', null)
    Router.push('/login')
  }

  return (
    <IsLoggedInOrRedirect>
      <div className={styles.container}>
      <Head>
        <title>index Panasend</title>
        <meta name="description" content="Log in to your Panasend account." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <a onClick={logOut}>Log out</a>
      <span>{data.username}</span>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Panasend</a>
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
    </IsLoggedInOrRedirect> 
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://random-data-api.com/api/users/random_user')
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
