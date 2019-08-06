const express = require('express');
const router = express.Router();

const registerAUser = (req, res) => {
    res.send('Register a user');
}

// @route   POST api/users
// @desc    Register a user
// @acess   Public
router.post('/', registerAUser);

module.exports = router;