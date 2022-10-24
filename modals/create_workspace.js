import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, Modal, Input, Row, Checkbox } from "@nextui-org/react";
import { getCookieValue, snackbarError, snackbarSuccess } from '../utils';
import Router, { useRouter } from 'next/router'
import { useSnackbar } from 'react-simple-snackbar'



export default function CreateWorkspaceModal(props) {

    const router = useRouter()
    const [openErrorSnack, closeErrorSnack] = useSnackbar(snackbarError)
    const [openSuccessSnack, closeSuccessSnack] = useSnackbar(snackbarSuccess)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    

    const handleSubmit = async(e) => {
    
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
          props.setVisible(false)
          
          if (res.status >= 400) {
            openErrorSnack('An error occured while creating the workspace: ' + JSON.stringify(res_data))
          }
          else {
            router.replace(router.asPath);
            openSuccessSnack('Workspace created successfully.')
          }
          
          
        }
        catch (bug) {
          openErrorSnack('An error occured while creating the workspace.')
        }
        
      }

  return (
      <Modal
                  closeButton
                  blur
                  width='600px'
                  preventClose
                  aria-labelledby="modal-title"
                  open={props.visible}
                  onClose={() => props.setVisible(false)}
                >
                  <Modal.Header>
                    <Text id="modal-title" size={18}>
                      <b>Create a new workspace</b>
                    </Text>
                  </Modal.Header>
                  <Modal.Body>
                  <div className="form">
                    <form onSubmit={handleSubmit}>
                    <Input
                      clearable
                      required
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Name"
                    />
                    <Input
                      clearable
                      required
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Address"
                      contentLeft={<></>}
                    />
                    </form>
                    </div>
                    
                    <Row justify="space-between">
                      <Checkbox>
                        <Text size={14}>Remember me</Text>
                      </Checkbox>
                      <Text size={14}>Forgot password?</Text>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button auto flat color="error" onClick={() => props.setVisible(false)}>
                      Close
                    </Button>
                    <Button auto onClick={() => handleSubmit()}>
                      Create workspace
                    </Button>
                  </Modal.Footer>
                </Modal>

  )
}
