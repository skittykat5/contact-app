//Add contact page component

import {
    Container,
    Button,
    Form
} from 'react-bootstrap'
import React, { useState } from "react";
import {useNavigate } from "react-router";

function NewContact () {

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        imageurl: "",
    });

    const navigate = useNavigate();
 
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    //Submit form
    async function onSubmit(e) {
        e.preventDefault();
      
        const newPerson = { ...form };

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
      
        setForm({ firstname: "", lastname: "", email: "", phone:"", imageurl:""});
        navigate("/");
    }

    return (
        <Container className="new-contact">
            <h1>New Contact</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e) => updateForm({ firstname: e.target.value })} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e) => updateForm({ lastname: e.target.value })} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" 
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e) => updateForm({ phone: e.target.value })} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control 
                        type="text" 
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
export default NewContact;