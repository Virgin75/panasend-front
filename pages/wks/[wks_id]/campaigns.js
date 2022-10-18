import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import IsLoggedInOrRedirect from '../../../components/isLoggedIn'
import TwoColumnsLayout from '../../../components/TwoColumnsLayout'
import NavigationMenu from '../../../components/NavigationMenu'
import ls from 'localstorage-slim';


export default function Campaign({ workspaces, current_wks, campaigns }) {

  return (
    <IsLoggedInOrRedirect>
    <div>
    <Head>
      <title>index Panasend</title>
      <meta name="description" content="Log in to your Panasend account." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <TwoColumnsLayout>
      <NavigationMenu workspaces={workspaces} current_wks={current_wks}/>

      <main>
        
          <h1>
            Campaigns
          </h1>
          {campaigns.map((campaign)=>
                <h2>{campaign.id}</h2>
          )}

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

    const res_campaigns = await fetch('http://127.0.0.1:8000/campaigns/campaigns?workspace_id=' + context.params['wks_id'], requestOptions)
    const campaigns = await res_campaigns.json()
  
    // Pass data to the page via props
    return { props: { workspaces, current_wks, campaigns } }
  }
