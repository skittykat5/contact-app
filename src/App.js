import ContactList from "./Components/ContactList/ContactList"
import NewContact from "./Components/NewContact/NewContact"
import ContactDetails from "./Components/ContactDetails/ContactDetails"
import UpdateContact from "./Components/UpdateContact/UpdateContact"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
       <Route exact path="/" element={<ContactList />} />
       <Route path="/edit/:id" element={<UpdateContact />} />
       <Route path="/contact/:id" element={<ContactDetails />} />
       <Route path="/newcontact" element={<NewContact />} />
     </Routes>
    </Router>
  );
}

export default App;
