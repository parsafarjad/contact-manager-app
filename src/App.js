import { useEffect } from 'react';
import {Routes,Route,Navigate,useNavigate} from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert';
import { useImmer } from 'use-immer';
import { ToastContainer, toast } from 'react-toastify';


import { ContactContext } from './context/contactContext';

import _ from 'lodash'

import Navbar from './components/Navbar';
import Contacts from './components/contact/Contacts';
import AddContact from "./components/contact/AddContact";
import ViewContact from "./components/contact/ViewContact";
import EditContact from "./components/contact/EditContact";
import './index.css'

import { getAllContacts, getAllGroups, createContact, deleteContact} from "./services/contactService"


const App = () => {
  const [loading, setLoading] = useImmer(false)
  const [contacts, setContacts] = useImmer([])
  const [filteredContacts, setFilteredContacts] = useImmer([])
  const [groups, setGroups] = useImmer([])

  const navigate = useNavigate()


  useEffect(() => {
    
    const fetchData = async () => {

      try{
        setLoading(true);
        
        const {data : contactsData} = await getAllContacts();
        const {data : groupsData} = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData)
        setGroups(groupsData);
        

        setLoading(false)
      }
      catch(error){
        console.log(error.message)
        setLoading(false)
      }
    }

    fetchData();
  }, []);


  const createContactForm = async (values) => {
    
    try{

      setLoading((draft) => !draft)

      const {status, data} = await createContact(values)

      if(status === 201) {

        toast.success("مخاطب با موفقیت ساخته شد")

        setContacts((draft) => {
          draft.push(data)
        })

        setFilteredContacts((draft) => {
          draft.push(data)
        })

        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    }
    catch(error){
      console.log(error.message);
      
      setLoading((prevLoading) => !prevLoading);
    }
  }

  const confirmDelete = (contactId, contactFullname) => {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir='rtl' style={{backgroundColor:"#44475a", border:"1px solid", borderColor:"#bd93f9", borderRadius:"1em"}}
          className="p-4">
            <h1 style={{color:"#f1fa8c"}}>پاک کردن مخاطب</h1>
            <p style={{color:"#f8f8f2"}}>مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی؟</p>
            <button onClick={() => {
              removeContact(contactId);
              onClose();
            }}
            className="btn mx-2"
            style={{backgroundColor:"#bd93f9"}}
            >مطمئن هستم</button>

            <button
              onClick={onClose} className="btn" style={{backgroundColor:"#6272a4"}}>
              انصراف
            </button>
          </div>
        );
      }
    });
  }

  const removeContact = async (contactId) => {

    const contactsBackup = [...contacts];

    try{
      
      //Contacts Copy
      setContacts((draft) => draft.filter((c) => c.id !== contactId))
      setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId))

      const {status} = await deleteContact(contactId)

      toast.error("مخاطب با موفقیت حذف شد")

      if(status !== 200){

        setContacts(contactsBackup)
        setFilteredContacts(contactsBackup)      
      }
    }
    catch(error){
      console.log(error.message)
      
      setContacts(contactsBackup)
      setFilteredContacts(contactsBackup)    
    }
  }

  const contactSearch = _.debounce((query) => { 

    if(!query) return setFilteredContacts([...contacts])

    setFilteredContacts((draft) => draft.filter(contact => contact.fullname.includes(query)))

  }, 1000)

  return (
    <ContactContext.Provider
    
    value={{
      loading,
      setLoading,
      setContacts,
      contacts,
      setFilteredContacts,
      groups,
      filteredContacts,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      contactSearch,
    }}
    >

    <div className="App">
      <ToastContainer rtl={true} position="top-right" theme='colored'/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate to="/contacts"/>}/>

        <Route path="/contacts" element={<Contacts/>}/>

        <Route path="/contacts/add" element={<AddContact/>} />

        <Route path="contacts/:contactId" element={<ViewContact/>} />

        <Route path="contacts/edit/:contactId"  element={<EditContact/>} />
 
      </Routes>
    </div>

    </ContactContext.Provider>
  );
};

export default App;
