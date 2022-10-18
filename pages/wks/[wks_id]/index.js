import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import IsLoggedInOrRedirect from '../../../components/isLoggedIn'
import TwoColumnsLayout from '../../../components/TwoColumnsLayout'
import NavigationMenu from '../../../components/NavigationMenu'

export default function PostPage({ data }) {
  const router = useRouter()
  const id = router.query.id

  return (
    <IsLoggedInOrRedirect>
    <div>
    <Head>
      <title>index Panasend</title>
      <meta name="description" content="Log in to your Panasend account." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <TwoColumnsLayout>
      <NavigationMenu wks={id} />

      <main>
        
          <h1>
            Welcome to <a href="https://nextjs.org">Panasend</a>
          </h1>

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

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://random-data-api.com/api/users/random_user')
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
