import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, Modal, Input, Row, Checkbox } from "@nextui-org/react";
import { getCookieValue, snackbarError, snackbarSuccess } from '../utils';
import Router, { useRouter } from 'next/router'
import { useSnackbar } from 'react-simple-snackbar'



export default function CreateEmailModal(props) {

    const router = useRouter()
    const [openErrorSnack, closeErrorSnack] = useSnackbar(snackbarError)
    const [openSuccessSnack, closeSuccessSnack] = useSnackbar(snackbarSuccess)

    const [name, setName] = useState('')
    const [type, setType] = useState('')

    console.log(props.current_wks)

    const handleSubmit = async(e) => {
    
        var requestOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookieValue("access")
          },
          body: JSON.stringify({"name": name, "type": type, "workspace": props.current_wks, "raw_html": "<html></html>"}),
        };
        try {
          const res = await fetch("http://127.0.0.1:8000/emails/emails", requestOptions)
          const res_data = await res.json()
          props.setVisible(false)
          
          if (res.status >= 400) {
            openErrorSnack('An error occured while creating the Email: ' + JSON.stringify(res_data))
          }
          else {
            router.replace(router.asPath);
            openSuccessSnack('Email created successfully.')
            router.push("/wks/" + props.current_wks + "/email/" + res_data.id)
          }
          
          
        }
        catch (bug) {
          openErrorSnack('An error occured while creating the email.')
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
                      <b>Create a new Email</b>
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
                      value={type}
                      onChange={e => setType(e.target.value)}
                      placeholder="Address"
                      contentLeft={<></>}
                    />
                    </form>
                    </div>
                    
                    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button auto flat color="error" onClick={() => props.setVisible(false)}>
                      Close
                    </Button>
                    <Button auto onClick={() => handleSubmit()}>
                      Create email
                    </Button>
                  </Modal.Footer>
                </Modal>

  )
}
