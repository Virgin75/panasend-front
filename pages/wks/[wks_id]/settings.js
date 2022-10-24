import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { Button } from "@nextui-org/react";
import ls from 'localstorage-slim';
import IsLoggedInOrRedirect from '../../../components/isLoggedIn';
import TwoColumnsLayout from '../../../components/TwoColumnsLayout';
import NavigationMenu from '../../../components/NavigationMenu';
import RightSection from '../../../components/RightSection';
import { Input, Spacer} from "@nextui-org/react";
import { get_workspaces_list } from '../../../api_calls';
import settingsLogo from '../../../public/settings.svg'
import ShareLogo from '../../../public/sharew.svg'



export default function WksSettings({ workspaces, current_wks }) {
  console.log(workspaces)
  const router = useRouter();

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const [name, setName] = useState(current_wks.name)
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

  const Content = () => {
    return (
      <main>
        <h4>Owned by company: {current_wks.company}</h4>
        <span>Created at: {current_wks.created_at}</span> <span> | Last updated at: {current_wks.updated_at}</span>
        <Spacer y={2.5} />
        <div className="form">
          <form onSubmit={handleSubmit}>
            <Input clearable bordered labelPlaceholder="Name" color="primary" value={name} onChange={e => setName(e.target.value)} />
            <Input clearable bordered labelPlaceholder="Postal address" color="primary" value={address} onChange={e => setAddress(e.target.value)} />

            <span style={{'color': 'red'}}>{error}</span>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>

      </main>
    )
  }
  return (
    <IsLoggedInOrRedirect>
    <div>
    <Head>
        <title>Workspace settings</title>
        <meta name="description" content="Create a new workspace." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <TwoColumnsLayout>

      <NavigationMenu workspaces={workspaces} current_wks={current_wks}/>

      <RightSection 
        icon={settingsLogo}
        title={current_wks.name}
        hasRole
        role={"Admin"}
        description="This is the place where you can edit your workspace settings and share access to other users."
        cta1={<Button light color="error" auto>Delete workspace</Button>}
        cta2={<Button 
          icon={<Image src={ShareLogo} height={25} width={25} />} 
          color="primary" 
          auto 
          css={{borderRadius: '33px', fontSize: '1.2rem', fontWeight: '500', padding: '22px 31px 22px 31px'}}>Invite new User</Button>}
        content={Content}
      >
      </RightSection>
      
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
    let { workspaces, current_wks } = await get_workspaces_list(context)
  
    // Pass data to the page via props
    return { props: { workspaces, current_wks } }

  }