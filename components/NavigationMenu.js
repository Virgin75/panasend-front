import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import ls from 'localstorage-slim';
import horizontalLogo from '../public/logo_panasend_light.svg'
import settingsLogo from '../public/settings.svg'
import chevron from '../public/chevron.png'
import userSettingsLogo from '../public/usersettings.svg'
import logoLight from '../public/logo_panasend_light_simple.png'
import { Collapse, Text, Popover, Modal, Input, Row, Checkbox, useTheme } from "@nextui-org/react";
import CampaignIcon from "../public/campaigns.svg"
import ContactIcon from "../public/contacts.svg"
import EmailIcon from "../public/emails.svg"
import ReportIcon from "../public/reports.svg"
import LogIcon from "../public/logs.svg"
import SyncIcon from '../public/sync.svg'
import Separator from './Separator';
import { Tooltip, Button } from "@nextui-org/react";
import CreateWorkspaceModal from '../modals/create_workspace';
import {colors} from '../lightTheme'




export default function NavigationMenu(props) {
  const { theme } = useTheme();
  console.log(colors)

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
  const [modalVisible, setModalVisible] = React.useState(false)
  const [popoverVisible, setPopoverVisible] = React.useState(false)




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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <Image
          src={logoLight}
          alt="Panasend logo"
          height={60}
          width={60}
        />
        <span style={{marginLeft: 'auto', marginRight: '12px', fontSize: '0.8rem'}}>👋  Welcome, {firstName}</span>
        <Image
          src={userSettingsLogo}
          height={30}
          width={30}
        />
      </div>
      
      <Popover placement='right-bottom' isOpen={popoverVisible} onOpenChange={() => setPopoverVisible(!popoverVisible)}>
            <Popover.Trigger>
            <div style={{
              width: '100%', 
              border: '1px solid ' + colors.cta, 
              borderRadius: '18px', 
              padding: '15px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: colors.cta2
            }}>
              <Image
                src={chevron}
                height={23}
                width={23}
              />
              <h3 style={{margin: 0, paddingLeft: '8px'}}>{props.current_wks.name}</h3>
              <div style={{marginLeft: 'auto'}}>
                <Tooltip content={"Go to workspace settings"} rounded color="primary">
                  <Link href={"/wks/"+ props.current_wks.id +"/settings"}>
                  <Image
                    src={settingsLogo}
                    height={25}
                    width={25}
                    style={{marginBottom: '-0px'}}
                  />
                  </Link>
                </Tooltip>
                
              </div>
              
            </div>
            </Popover.Trigger>
            <Popover.Content css={{ padding: '20px' }}>
              <>
                <Text css={{ p: "$10",fontWeight: 700 }}>
                  Select the workspace you want to work on:
                </Text>
                <div style={{height: '250px'}}>
                  {props.workspaces.map((wks)=>
                  <>
                    <h4 style={{paddingTop: '8px', paddingBottom: '8px'}}><Link href={'/wks/'+wks['id']+'/campaigns'}>{wks['name']}</Link></h4>
                  </>
                  )}
                </div>
                  <Button auto onClick={() => {
                    setModalVisible(true);
                    setPopoverVisible(false);
                  }}>
                      Create a new workspace
                  </Button>
              </>
            </Popover.Content>
      </Popover>
      <CreateWorkspaceModal visible={modalVisible} setVisible={setModalVisible} />
      
      <Collapse.Group divider={false}>
      <Collapse css={{marginTop: '-6px', marginBottom: '-6px'}} title="Campaigns" contentLeft={<Image src={CampaignIcon} height={35} width={35}/>}>
        <Text css={{color: '$primary'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </Collapse>
      <Collapse css={{marginTop: '-6px', marginBottom: '-6px'}} title="Contacts" contentLeft={<Image src={ContactIcon} height={35} width={35}/>}>
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
