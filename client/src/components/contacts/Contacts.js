import React, { Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
    useEffect(() => {
        console.log("Contacts.js");
      }, []);
    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;
    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact= {contact} />
            ))}
        </Fragment>
    )
}

export default Contacts
