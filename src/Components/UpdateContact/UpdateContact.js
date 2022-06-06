//Update contact page
import {
    Container,
    Button,
    Form
} from 'react-bootstrap'
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

function UpdateContact () {
    const [form, setForm] = useState({
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
      
          setForm(record);
        }
      
        fetchData();
      
        return;
    }, [params.id]);

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }

    //Button submit
    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          phone: form.phone,
          imageurl: form.imageurl,
        };
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        navigate("/");
    }

    return (
        <Container className="update-contact">
            <h1>Edit Contact</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={form.firstname}
                        onChange={(e) => updateForm({ firstname: e.target.value })} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={form.lastname}
                        onChange={(e) => updateForm({ lastname: e.target.value })} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" 
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={form.phone}
                        onChange={(e) => updateForm({ phone: e.target.value })} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={form.imageurl}
                        onChange={(e) => updateForm({ imageurl: e.target.value })} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
export default UpdateContact;