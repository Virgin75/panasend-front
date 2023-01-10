import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { Button, Checkbox, Dropdown } from "@nextui-org/react";
import ls from 'localstorage-slim';
import IsLoggedInOrRedirect from '../../../components/isLoggedIn';
import TwoColumnsLayout from '../../../components/TwoColumnsLayout';
import NavigationMenu from '../../../components/NavigationMenu';
import RightSection from '../../../components/RightSection';
import { Input} from "@nextui-org/react";
import { get_workspaces_list } from '../../../api_calls';
import settingsLogo from '../../../public/settings.svg'
import ShareLogo from '../../../public/sharew.svg'
import DateLogo from '../../../public/date.svg'
import { Card, Grid, Text, Row , Table, Spacer, Col } from "@nextui-org/react";


export default function WksSettings({ workspaces, current_wks }) {
  const router = useRouter();

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

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
    const [name, setName] = useState(current_wks.name)
    const [address, setAddress] = useState('')
    const [error, setError] = useState('')
    const [membersSelected, setMembersSelected] = useState([])
    return (
      <main>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={7}>
            <Card variant="bordered" css={{flex: 2}}>
              <Card.Header>
                <Text b>Your workspace details</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <Row gap={1}>
                    <Image src={DateLogo} height={25} width={25} />
                    <span style={{marginTop: '3px'}}>Created at: {new Date(current_wks.created_at).toDateString()}</span> 
                    <span style={{marginTop: '3px'}}> | Last updated at: {new Date(current_wks.updated_at).toDateString()}</span>
                  </Row>
                  
                  <Spacer y={2.5} />
                  <div className="form">
                    <form onSubmit={handleSubmit}>
                      <Row gap={1}>
                        <Col>
                          <Input clearable labelPlaceholder="Name" status="primary" css={{width: '100%'}} value={name} onChange={e => setName(e.target.value)} />
                        </Col>
                        <Col>
                          <Input clearable labelPlaceholder="Postal address" status="default" css={{width: '100%'}} value={address} onChange={e => setAddress(e.target.value)} />
                        </Col>
                      </Row>
                    
                      <Checkbox defaultSelected={true}>Auto add UTM to links?</Checkbox>
                      <Dropdown>
                        <Dropdown.Button flat>SMTP Sender</Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions">
                          <Dropdown.Item key="new">New file</Dropdown.Item>
                          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                          <Dropdown.Item key="delete" withDivider color="error">
                            Delete file
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <span style={{'color': 'red'}}>{error}</span>
                      <div className="button-container">
                        <input type="submit" />
                      </div>
                    </form>
                  </div>
              </Card.Body>
              <Card.Divider />
              <Card.Footer>
              <Row justify="flex-end">
                <Button size="sm">Update</Button>
              </Row>
              </Card.Footer>
            </Card>
          </Grid>
          <Grid xs={12} sm={5}>
            <Card variant="bordered" css={{flex: 2}}>
            <Card.Header>
                <Text b>Members</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
              <Table
                aria-label="Example table with static content"
                css={{
                  height: "auto",
                  minWidth: "100%",
                }}
                shadow={false}
                selectionMode="multiple"
                striped
                onSelectionChange={selected =>  setMembersSelected(Array.from(selected))}
              >
                <Table.Header>
                  <Table.Column>NAME</Table.Column>
                  <Table.Column>EMAIL</Table.Column>
                  <Table.Column>STATUS</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row key="1">
                    <Table.Cell>Tony Reichert</Table.Cell>
                    <Table.Cell>CEO</Table.Cell>
                    <Table.Cell>Active</Table.Cell>
                  </Table.Row>
                  <Table.Row key="2">
                    <Table.Cell>Zoey Lang</Table.Cell>
                    <Table.Cell>Technical Lead</Table.Cell>
                    <Table.Cell>Paused</Table.Cell>
                  </Table.Row>
                  <Table.Row key="3">
                    <Table.Cell>Jane Fisher</Table.Cell>
                    <Table.Cell>Senior Developer</Table.Cell>
                    <Table.Cell>Active</Table.Cell>
                  </Table.Row>
                  <Table.Row key="4">
                    <Table.Cell>William Howard</Table.Cell>
                    <Table.Cell>Community Manager</Table.Cell>
                    <Table.Cell>Vacation</Table.Cell>
                  </Table.Row>
                  <Table.Row key="5">
                    <Table.Cell>William Howard</Table.Cell>
                    <Table.Cell>Community Manager</Table.Cell>
                    <Table.Cell>Vacation</Table.Cell>
                  </Table.Row>
                  <Table.Row key="6">
                    <Table.Cell>William Howard</Table.Cell>
                    <Table.Cell>Community Manager</Table.Cell>
                    <Table.Cell>Vacation</Table.Cell>
                  </Table.Row>
                
                </Table.Body>
              </Table>
              {membersSelected.length > 0 &&
              <>
                <Card.Divider />
                <Card.Footer>
                  <Row justify="flex-end">
                    <Button size="sm" auto>Edit</Button>
                    <Spacer x={1} />
                    <Button color="error" size="sm" auto>Delete</Button>
                  </Row>
                </Card.Footer>
              </>
              }
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={5}>
            <Card variant="bordered" css={{flex: 2}}>
            <Card.Header>
                <Text b>SMTP settings</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <Text>Bordered card.</Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={7}>
            <Card variant="bordered" css={{flex: 2}}>
            <Card.Header>
                <Text b>Domain & sender adresses</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <Text>Bordered card.</Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={12}>
            <Card variant="bordered" css={{flex: 2}}>
            <Card.Header>
                <Text b>Tracker API & data sync.</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <Text>Bordered card.</Text>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
        
        
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
        role={current_wks.role}
        description="This is the place where you can edit your workspace settings and share access to other users."
        cta1={<Button light color="error" auto>Delete workspace</Button>}
        cta2={<Button 
          icon={<Image src={ShareLogo} height={25} width={25} />} 
          color="primary" 
          auto 
          css={{borderRadius: '33px', fontSize: '1.2rem', fontWeight: '500', padding: '22px 31px 22px 31px', backgroundColor: '#28468C'}}>Invite new User</Button>}
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