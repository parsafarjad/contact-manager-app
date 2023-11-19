import { createContext } from "react";

export const ContactContext = createContext({

    loading: false,
    setLoading: () => {},
    // contact: () => {},
    setContacts: () => {},
    contacts: [],
    // errors: [],
    setFilteredContacts: () => {},
    contactQuery: {},
    groups: [],
    filteredContacts: [],
    // onContactChange: () => {},
    deleteContact: () => {},
    updateContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
})