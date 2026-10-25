// ======================================================
// MODULE 5 - EXERCISE 4
// FRIEND CONTROLLER
//
// Handles friend-related application logic.
// Routes will call these exported functions.
// ======================================================

const friends = require('../models/friends');


// ------------------------------------------------------
// 1. GET ALL FRIENDS
// GET /friends
// ------------------------------------------------------

const getAllFriends = (req, res) => {

    return res.status(200).json(friends);

};


// ------------------------------------------------------
// 2. FILTER FRIENDS
// GET /friends/filter?gender=male&letter=R
// ------------------------------------------------------

const filterFriends = (req, res) => {

    const filterGender = req.query.gender;
    const filterLetter = req.query.letter;

    let matchingFriends = [...friends];

    // Filter by gender.
    if (filterGender) {

        matchingFriends = matchingFriends.filter(friend =>
            friend.gender.toLowerCase() ===
            filterGender.toLowerCase()
        );

    }

    // Filter by starting letter.
    if (filterLetter) {

        matchingFriends = matchingFriends.filter(friend =>
            friend.name.toLowerCase().startsWith(
                filterLetter.toLowerCase()
            )
        );

    }

    if (matchingFriends.length > 0) {

        return res.status(200).json(matchingFriends);

    }

    return res.status(404).json({
        error: "No friends match the supplied filters."
    });

};


// ------------------------------------------------------
// 3. GET REQUEST HEADERS
// GET /friends/info
// ------------------------------------------------------

const getRequestInfo = (req, res) => {

    return res.status(200).json({

        'user-agent': req.get('user-agent') || null,

        'content-type': req.get('content-type') || null,

        'accept': req.get('accept') || null

    });

};


// ------------------------------------------------------
// 4. GET FRIEND BY ID
// GET /friends/3
// ------------------------------------------------------

const getFriendById = (req, res) => {

    const friendId = Number(req.params.id);

    const matchingFriend = friends.find(friend =>
        friend.id === friendId
    );

    if (!matchingFriend) {

        return res.status(404).json({
            error: "Friend not found"
        });

    }

    return res.status(200).json(matchingFriend);

};


// ------------------------------------------------------
// 5. ADD A NEW FRIEND
// POST /friends
// ------------------------------------------------------

const addFriend = (req, res) => {

    const newFriend = req.body;

    // Validate required fields.
    if (
        !newFriend ||
        typeof newFriend.name !== 'string' ||
        !newFriend.name.trim() ||
        typeof newFriend.gender !== 'string' ||
        !newFriend.gender.trim()
    ) {

        return res.status(400).json({
            error: "Friend object must contain a valid name and gender"
        });

    }

    // Generate an ID higher than the existing IDs.
    const nextId = friends.reduce(
        (maxId, friend) => Math.max(maxId, friend.id),
        0
    ) + 1;

    const friendToAdd = {

        id: nextId,

        name: newFriend.name.trim(),

        gender: newFriend.gender.trim()

    };

    friends.push(friendToAdd);

    return res.status(200).json(friendToAdd);

};


// ------------------------------------------------------
// 6. UPDATE AN EXISTING FRIEND
// PUT /friends/3
// ------------------------------------------------------

const updateFriend = (req, res) => {

    const friendId = Number(req.params.id);

    const updatedFriend = req.body;

    const friendIndex = friends.findIndex(friend =>
        friend.id === friendId
    );

    if (friendIndex === -1) {

        return res.status(404).json({
            error: "Friend not found"
        });

    }

    if (
        !updatedFriend ||
        typeof updatedFriend.name !== 'string' ||
        !updatedFriend.name.trim() ||
        typeof updatedFriend.gender !== 'string' ||
        !updatedFriend.gender.trim()
    ) {

        return res.status(400).json({
            error: "Friend must contain a valid name and gender"
        });

    }

    friends[friendIndex] = {

        id: friendId,

        name: updatedFriend.name.trim(),

        gender: updatedFriend.gender.trim()

    };

    return res.status(200).json(friends[friendIndex]);

};


// ------------------------------------------------------
// EXPORT CONTROLLER FUNCTIONS
// ------------------------------------------------------

module.exports = {

    getAllFriends,

    filterFriends,

    getRequestInfo,

    getFriendById,

    addFriend,

    updateFriend

};