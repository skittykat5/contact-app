import {
    Container,
    Stack,
    Button
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import './Home.css'

function Home () {
    return (
        <Container className="home-app">
            <Stack gap={3}>
                <h1>Contact App</h1>
                <LinkContainer to="/login">
                    <Button>Log In</Button>
                </LinkContainer>
                <LinkContainer to="/signup">
                    <Button>Sign Up</Button>
                </LinkContainer>
            </Stack>
        </Container>
    )
}
export default Home;
