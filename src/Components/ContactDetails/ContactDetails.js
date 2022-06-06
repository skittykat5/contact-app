import {
    Container,
    Stack,
    Button
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import './ContactDetails.css'

function ContactDetails () {
    const [contact, setContact] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        imageurl: "",
      });
    const params = useParams();
    const navigate = useNavigate();

    //Get contact by ID via server
    useEffect(() => {
        async function fetchData() {
          const id = params.id.toString();
          const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
      
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const record = await response.json();
          if (!record) {
            window.alert(`Contact with id ${id} not found`);
            return;
          }
      
          setContact(record);
        }
      
        fetchData();
      
        return;
    }, []);

    //Function to delete contact
    function deleteContact(id) {
        fetch(`http://localhost:5000/${id}`, {
          method: "DELETE"
        });
        navigate("/");
    }

    return (
        <Container className="contact-details">
            <Stack gap={3}>
                <img src={contact.imageurl}/>
                <h1>Name: {contact.firstname + " " + contact.lastname}</h1>
                <h1>Email: {contact.email}</h1>
                <h1>Phone Number: {contact.phone}</h1>
                <LinkContainer to={`/edit/${params.id}`}>
                    <Button>Edit Contact</Button>
                </LinkContainer>
                <Button 
                    onClick={() => {
                        deleteContact(params.id);
                    }}
                >Delete Contact</Button>
            </Stack>
        </Container>
    )
}
export default ContactDetails;
