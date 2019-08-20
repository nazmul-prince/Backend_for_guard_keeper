import React, { useReducer } from 'react'; 
import uuid from 'uuid'; 
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                "type": "personal",
                "_id": "5d4d0c96cd2d582828bcaab7",
                "name": "Nazmul2",
                "email": "nazmul2@gmail.com",
                "phone": "111111122111",
                "user": "5d4a7c0bec2c57316e9ad07f",
                "date": "2019-08-09T06:03:02.560Z",
                "__v": 0
            },
            {
                "type": "professional",
                "_id": "5d4d0c7dcd2d582828bcaab6",
                "name": "Nazmul",
                "email": "nazmul@gmail.com",
                "phone": "11111111111",
                "user": "5d4a7c0bec2c57316e9ad07f",
                "date": "2019-08-09T06:02:37.903Z",
                "__v": 0
            }
        ],
        current: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({type: ADD_CONTACT, payload: contact });
    };

    // Delete contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id });
    };

    // Set current contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact });
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT });
    };

    // Update contact

    // Filter contacts

    // Clear filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent
            }}
        >
            { props.children }
        </ContactContext.Provider>
    );
};

export default ContactState;