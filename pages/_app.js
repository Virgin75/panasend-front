import '../styles/globals.css'
import App from 'next/app'
import { UserProvider } from '../userContext'
import { NextUIProvider } from '@nextui-org/react';
import theme from '../lightTheme.js'
import ls from 'localstorage-slim';

let jwt_token = ls.get('user')

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </NextUIProvider>   
  )
}


export default MyApp
