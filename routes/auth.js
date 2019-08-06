const express = require('express');
const router = express.Router();

const getLoggedInUser = (req, res) => {
    res.send('Get logged in user');
}

const authUserGetToken = (req, res) => {
    res.send('Auth user and get token');
}

// @route   POST api/auth
// @desc    Auth user and get token
// @acess   Public
router.get('/', getLoggedInUser);

router.post('/', authUserGetToken);

module.exports = router;