import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import ls from 'localstorage-slim';
import horizontalLogo from '../public/logo_panasend_light.svg'
import { Collapse, Text, Popover } from "@nextui-org/react";
import CampaignIcon from "../public/campaigns.svg"
import ContactIcon from "../public/contacts.svg"
import EmailIcon from "../public/emails.svg"
import ReportIcon from "../public/reports.svg"
import LogIcon from "../public/logs.svg"
import SyncIcon from '../public/sync.svg'
import Separator from './Separator';



export default function NavigationMenu(props) {

  const router = useRouter()
  function setDefaultVal(value, defaultValue){
    return (value === undefined) ? defaultValue : value;
  }

  

  const logOut = () => {
    ls.clear()
    document.cookie.split(';').forEach(function(c) {
      document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    });
    Router.push('/login')
  }

  const [firstName, setFirstName] = useState('')
  const [companyId, setCompanyID] = useState('')


  useEffect(() => {
    setFirstName(ls.get('user_details')?.first_name)
    setCompanyID(ls.get('company_id'))
  }, [])
  

  return (
    <div style={{
      backgroundColor: 'rgba(255, 235, 176, 0.39)', 
      borderRadius: '18px', 
      padding: '33px', 
      margin: '33px', 
      display: 'flex', 
      flexDirection: 'column',
      height: '93vh',
    }}>
      
      <Image
        src={horizontalLogo}
          alt="Panasend logo"
          height={70}
      />
      <span>👋  Welcome, {firstName}</span>
      <Popover placement='right-bottom'>
            <Popover.Trigger>
            <div style={{width: '100%', border: '1px solid black', borderRadius: '18px', padding: '15px', cursor: 'pointer'}}>
              {props.current_wks.name}
            </div>
            </Popover.Trigger>
            <Popover.Content>
              <Text css={{ p: "$10",fontWeight: 700 }}>
                Select the workspace you want to work on:
              </Text>
              
                {props.workspaces.map((wks)=>
                <>
                  <Link href={'/wks/'+wks['id']+'/campaigns'}>{wks['name']}</Link>
                  <br></br>
                </>
                )}
              <Link href={'/wks/'+ props.current_wks.id +'/new-workspace'}>Create a new Workspace</Link>
            </Popover.Content>
      </Popover>
      
      <Collapse.Group divider={false}>
      <Collapse title="Campaigns" contentLeft={<Image src={CampaignIcon} height={35} width={35}/>}>
        <Text css={{color: '$primary'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </Collapse>
      <Collapse title="Contacts" contentLeft={<Image src={ContactIcon} height={35} width={35}/>}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      
      </Collapse>
      <a href='/emails'>
        <Collapse showArrow={false} animated={false} title="Email templates" contentLeft={<Image src={EmailIcon} height={35} width={35}/>}></Collapse>
      </a>
    </Collapse.Group>
    
    <Separator />

    <Collapse.Group divider={false}>
      <a href='/'>
        <Collapse showArrow={false} animated={false} expanded={false} title="Reports" contentLeft={<Image src={ReportIcon} height={35} width={35}/>}></Collapse>
      </a>
      <a href='/'>
        <Collapse showArrow={false} animated={false} expanded={false} title="Activity logs" contentLeft={<Image src={LogIcon} height={35} width={35}/>}></Collapse>
      </a>
    </Collapse.Group>

    <Separator />

    <Collapse.Group divider={false}>
      <a href='/'>
        <Collapse showArrow={false} animated={false} expanded={false} title="Data sync. / Integrations" contentLeft={<Image src={SyncIcon} height={35} width={35}/>}></Collapse>
      </a>
    </Collapse.Group>
    <a onClick={logOut} style={{marginTop: 'auto'}}>Log out</a>
    </div>
  )
}
