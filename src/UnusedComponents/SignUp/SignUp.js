//Sign up page component
import {
    Container,
    Button,
    Form
} from 'react-bootstrap'
import React, { useState } from "react";

function SignUp () {

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [password2, setPass2] = useState("");

    //const navigate = useNavigate();
 
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    //Submit form
    async function onSubmit(e) {
        e.preventDefault();
      
        const newPerson = { ...form };

        //Verify passwords match

        if (newPerson.password == password2){
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
      
            setForm({ username: "", password: ""});
            setPass2({ password2: ""});
            //navigate("/contactlist");
        }
      
      }

    return (
        <Container>
            <h1>Sign Up</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username"
                        onChange={(e) => updateForm({ username: e.target.value })} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPass2(e.target.value )}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
export default SignUp;
