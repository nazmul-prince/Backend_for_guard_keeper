const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}
const createAContact = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name, email, phone, type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}
const updateContact = async (req, res) => {
    const { name, email, phone, type } = req.body;

    //Build contact object
    const contactFields = {};

    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return status(404).json({ msg: 'Contact not found' });

        //Make sure user owns the contact
        if(contact.user.toString() != req.user.id) {
            return status(401).json({ msg: 'Not authorized' });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set: contactFields },
            { new: true});

        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}
const deleteContact = async (req, res) => {try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return status(404).json({ msg: 'Contact not found' });

    //Make sure user owns the contact
    if(contact.user.toString() != req.user.id) {
        return status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
}

// @route   GET api/contacts
// @desc    Get all users contacts
// @acess   Private
router.get('/', auth, getContacts);

// @route   POST api/contacts
// @desc    Add a contact
// @acess   Private
router.post('/', [auth,
    check('name', 'Name is required').not().isEmpty()
], createAContact);

// @route   PUT api/users/:id
// @desc    Update a contact
// @acess   Private
router.put('/:id', auth, updateContact);

// @route   DELETE api/users
// @desc    Delete a contact
// @acess   Private
router.delete('/:id', auth, deleteContact);

module.exports = router;