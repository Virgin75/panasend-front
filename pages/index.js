import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useUserTokenAuth from '../utils/checkLogin'

export default function Home() {
  const [token, setToken] = useUserTokenAuth()

  return (
    <div className={styles.container}>
      <Head>
        <title>index Panasend {token}</title>
        <meta name="description" content="Log in to your Panasend account." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
  )
}
