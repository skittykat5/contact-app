//Page that displays list of contacts
import {
    Container,
    Stack,
    Button
} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import {LinkContainer} from 'react-router-bootstrap'

import './ContactList.css'

//Formatting of list items
const Record = (props) => (
    <LinkContainer to={`/contact/${props.record._id}`}>
        <Button variant="outline-primary">{props.record.firstname + " " + props.record.lastname}</Button>
    </LinkContainer>
);

function ContactList () {

    const [records, setRecords] = useState([]);

    //Get list of contacts from server
    useEffect(() => {
        async function getRecords() {
          const response = await fetch(`http://localhost:5000/record/`);
      
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const records = await response.json();
          setRecords(records);
        }
      
        getRecords();
      
        return;
    }, [records.length]);

    //List contacts

    function recordList() {
        return records.map((record) => {
          return (
            <Record
              record={record}
              key={record._id}
            />
          );
        });
      }

    return (
        <Container className="contact-list">
            <Stack gap={3}>
                <h1>My Contacts</h1>
                {recordList()}
                <LinkContainer to="/newcontact">
                    <Button>Add New Contact</Button>
                </LinkContainer>
            </Stack>
        </Container>
    )
}
export default ContactList;
