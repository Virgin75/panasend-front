import '../styles/globals.css'
import { UserProvider } from '../userContext'
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </CookiesProvider>
    
  )
}

export default MyApp
