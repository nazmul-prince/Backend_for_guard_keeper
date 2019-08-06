const express = require('express');
const router = express.Router();

const getContacts = (req, res) => {
    res.send('Register a user');
}
const createAContact = (req, res) => {
    res.send('Add a contact');
}
const updateContact = (req, res) => {
    res.send('Update a contact');
}
const deleteContact = (req, res) => {
    res.send('Delete a contact');
}

// @route   GET api/contacts
// @desc    Get all users contacts
// @acess   Private
router.get('/', getContacts);

// @route   POST api/contacts
// @desc    Add a contact
// @acess   Private
router.post('/', createAContact);

// @route   PUT api/users/:id
// @desc    Update a contact
// @acess   Private
router.put('/:id', updateContact);

// @route   DELETE api/users
// @desc    Delete a contact
// @acess   Private
router.delete('/:id', deleteContact);

module.exports = router;