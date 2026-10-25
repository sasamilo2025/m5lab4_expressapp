// ======================================================
// MODULE 5 - EXERCISE 4
// FRIEND ROUTES
//
// Defines API endpoints and connects them to
// their corresponding controller functions.
// ======================================================

// Import Express.
const express = require('express');

// Create an Express router.
const router = express.Router();

// Import our friend controller.
const friendController = require('../controllers/friendController');


// ------------------------------------------------------
// GET ALL FRIENDS
// GET /friends
// ------------------------------------------------------

router.get('/', friendController.getAllFriends);


// ------------------------------------------------------
// FILTER FRIENDS
// GET /friends/filter?gender=male&letter=R
// ------------------------------------------------------

router.get('/filter', friendController.filterFriends);


// ------------------------------------------------------
// GET REQUEST HEADERS
// GET /friends/info
// ------------------------------------------------------

router.get('/info', friendController.getRequestInfo);


// ------------------------------------------------------
// GET FRIEND BY DYNAMIC ID
// GET /friends/3
// ------------------------------------------------------

router.get('/:id', friendController.getFriendById);


// ------------------------------------------------------
// ADD A NEW FRIEND
// POST /friends
// ------------------------------------------------------

router.post('/', friendController.addFriend);


// ------------------------------------------------------
// UPDATE AN EXISTING FRIEND
// PUT /friends/3
// ------------------------------------------------------

router.put('/:id', friendController.updateFriend);


// Export the router.
module.exports = router;