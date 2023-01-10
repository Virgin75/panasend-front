import { useRouter } from 'next/router'
import Link from 'next/link'
import IsLoggedInOrRedirect from '../../../components/isLoggedIn'
import TwoColumnsLayout from '../../../components/TwoColumnsLayout'
import NavigationMenu from '../../../components/NavigationMenu'
import ls from 'localstorage-slim';
import {get_campaigns_list, get_workspaces_list} from '../../../api_calls'


export default function Campaign({ workspaces, current_wks, campaigns }) {

  return (
    <IsLoggedInOrRedirect>
    <div>
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

    // Fetch data from API
    let campaigns = await get_campaigns_list(context)
    let { workspaces, current_wks } = await get_workspaces_list(context)
  
    // Pass data to the page via props
    return { props: { workspaces, current_wks, campaigns } }
  }
