import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { Button, Checkbox, Dropdown, Pagination } from "@nextui-org/react";
import ls from 'localstorage-slim';
import IsLoggedInOrRedirect from '../../../components/isLoggedIn';
import TwoColumnsLayout from '../../../components/TwoColumnsLayout';
import NavigationMenu from '../../../components/NavigationMenu';
import RightSection from '../../../components/RightSection';
import { Input} from "@nextui-org/react";
import { get_workspaces_list, get_emails_list } from '../../../api_calls';
import emailLogo from '../../../public/emails.svg'
import plusLogo from '../../../public/plus.svg'
import dotsLogo from '../../../public/dots.svg'
import searchLogo from '../../../public/search.svg'
import { usePageLoading } from '../../../usePageLoading';
import { Card, Grid, Text, Row , Table, Spacer, Col, Container } from "@nextui-org/react";
import CreateEmailModal from '../../../modals/create_email';


export default function Emails({ workspaces, current_wks, emails, totalEmails, totalPages, currentPage }) {
  const router = useRouter()
  const { isPageLoading } = usePageLoading()


  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const [modalVisible, setModalVisible] = useState(false)


  const Content = () => {
   
    const [selected, setSelected] = React.useState(new Set(["TAG"]));
    console.log(router.pathname, router.query)

    const selectedValue = React.useMemo(
      () => Array.from(selected).join(", ").replaceAll("_", " "),
      [selected]
    );

    const handlePageChange = page => {
      let query = { 
        p: page.toString(),
        wks_id: router.query.wks_id
      }
      if (router.query.hasOwnProperty('s')) {
        query['s'] = router.query['s']
      }
      router.push({
        pathname: router.pathname,
        query: query,
      }, undefined, { scroll: false })
    }

    const handleFilters = e => {
      router.push({
        pathname: router.pathname,
        query: { 
          s: e.target.value,
          wks_id: router.query.wks_id
        },
      })
    }

    return (
      <main>
        <Spacer y={2} />
        <Row>
            <Col css={{marginRight: '20px'}}>
              <Input
                clearable
                autoFocus
                initialValue={router.query?.s}
                onChange={e => handleFilters(e)}
                color="primary"
                size='xl'
                width='100%'
                labelPlaceholder="Search..."
                contentLeft={<Image src={searchLogo} height={23} width={23} />}
              />
            </Col>
            <Col>
            <Dropdown>
              <Dropdown.Button flat color="secondary" css={{ tt: "capitalize", height: '50px', width: 'auto'}}>
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
              >
                <Dropdown.Item key="text">Select a tag...</Dropdown.Item>
                <Dropdown.Item key="number">Number</Dropdown.Item>
                <Dropdown.Item key="date">Date</Dropdown.Item>
                <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
                <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Col>
          </Row>
          
          
          <Spacer y={1} />
          
          <Table
                aria-label="Example table with static content"
                css={{
                  height: "auto",
                  width: "100%",
                }}
                shadow={true}
                fixed
                hoverable
                selectionMode='single'
              >
                <Table.Header>
                  <Table.Column>EMAIL NAME</Table.Column>
                  <Table.Column>TAG</Table.Column>
                  <Table.Column>TYPE</Table.Column>
                  <Table.Column>CREATED AT</Table.Column>
                  <Table.Column>UPDATED AT</Table.Column>
                  <Table.Column>USED IN ... CAMPAIGNS</Table.Column>
                  <Table.Column></Table.Column>
                </Table.Header>
                <Table.Body>
                {
                  emails.map(item => 
                    <Table.Row key={item.id}>
                      
                      <Table.Cell>
                      <Link href={"/wks/" + current_wks.id + "/email/" + item.id}>
                        <div style={{display: "flex", gap: '17px'}}>
                          {<Image src={emailLogo} height={23} width={23} />}
                          <div style={{display: "flex", flexDirection: "column"}}>
                            <p>{item.name}</p>
                            <p style={{fontWeight: 300, fontSize: "0.9rem", marginTop: "-3px"}}>Ceci est une desc</p>
                          </div>
                        </div>
                      </Link>
                      </Table.Cell>
                      
                      <Table.Cell>None</Table.Cell>
                      <Table.Cell>{item.type}</Table.Cell>
                      <Table.Cell>{new Date(item.created_at).toDateString()}</Table.Cell>
                      <Table.Cell>{new Date(item.updated_at).toDateString()}</Table.Cell>
                      <Table.Cell>0</Table.Cell>
                      <Table.Cell>{<Image src={dotsLogo} height={20} width={20} />}</Table.Cell>
                    </Table.Row>
                  )
                } 
                
                </Table.Body>
              </Table>
              
              <Spacer y={2} />
              <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                <Pagination 
                  onChange={page => {handlePageChange(page)}}
                  rounded 
                  total={totalPages} 
                  initialPage={currentPage} 
                />
              </div>
              <Spacer y={2} />
              
      </main>
    )
  }

  return (
    <IsLoggedInOrRedirect>
    <div>
    <CreateEmailModal visible={modalVisible} setVisible={setModalVisible} current_wks={current_wks.id} />
    <Head>
        <title>Workspace settings</title>
        <meta name="description" content="Create a new workspace." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <TwoColumnsLayout>

      <NavigationMenu workspaces={workspaces} current_wks={current_wks}/>

      {isPageLoading ? (
        <h1>Loading...</h1>
      ) : (
        <RightSection 
          icon={emailLogo}
          title="Email templates"
          description="This is the place where you can manage your email templates used in your newsletters or automation campaigns."
          cta2={<Button 
            icon={<Image src={plusLogo} height={15} width={15} />} 
            color="primary" 
            auto
            onClick={() => setModalVisible(true)}
            css={{borderRadius: '33px', fontSize: '1.2rem', fontWeight: '500', padding: '22px 31px 22px 31px', backgroundColor: '#28468C'}}>Create new email</Button>}
          content={Content}
        >
      </RightSection>
      )}
      
      
      
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
    let { emails, totalEmails, totalPages, currentPage} = await get_emails_list(context)
  
    // Pass data to the page via props
    return { props: { workspaces, current_wks, emails, totalEmails, totalPages, currentPage } }

  }