import '../styles/globals.css'
import App from 'next/app'
import { UserProvider } from '../userContext'
import { NextUIProvider } from '@nextui-org/react';
import Head from 'next/head'
import theme from '../lightTheme.js'
import ls from 'localstorage-slim';
import SnackbarProvider from 'react-simple-snackbar'
import '../App.css'


let jwt_token = ls.get('user')

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>index Panasend</title>
      <meta name="description" content="Log in to your Panasend account." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SnackbarProvider>
      <NextUIProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </NextUIProvider>  
    </SnackbarProvider>
    </>
  )
}


export default MyApp
