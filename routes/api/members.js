const express = require('express');
// When using the router to organize routes
// Delete the parent url from the get('url')
const router = express.Router();


const members = require('../../api/members_list');

// Gets all members
// Instead of '/api/members' -> '/'
router.get('/', (req, res) => {
    // Return data in json format
    res.json(members);
});

// Get single member
// Instead of '/api/members/:id' -> '/:id'
router.get('/:id', (req, res) => {
    const data = members.filter((member) => {
        return member.id === req.params.id;
    });
    if (Object.keys(data).length > 0)
        res.json(data);
    else
        res.status(400).json({
            msg: `No member with id: ${req.params.id}`
        });
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: Math.random().toString().slice(2, 11),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: `Please include both a name and email.`
        });
    }

    members.push(newMember);

    res.redirect('/');
});


// Update Member
router.put('/:id', (req, res) => {

    var found = false;
    // Here we check if user submitted a name or email
    if (req.body.name || req.body.email) {
        var changedMember;
        // cycle through members array and change either the name or email
        members.map((member) => {
            if (member.id === req.params.id) {
                member.name = req.body.name ? req.body.name : member.name;
                member.email = req.body.email ? req.body.email : member.email;
                found = true;
                changedMember = member;
            }
        });
    }

    // If user didnt submit name or email -> 400 response
    if (!found) {
        return res.status(400).json({
            msg: `Nothing to update you did not send a name or email to be updated`
        });
    } else {
        res.json({
            msg: 'Member Updated',
            changedMember
        });
    }
});

// Delete Member
router.delete('/:id', (req, res) => {
    // Returns true if there is a user with the params.id
    const found = members.some((member) => {
        return member.id === req.params.id;
    });

    if (found) {
        // Simulates a delete
        const data = members.filter((member) => {
            return member.id !== req.params.id;
        });
        res.json({
            msg: 'User was deleted',
            data
        })
    } else {
        res.status(400).json({
            msg: `No member with id: ${req.params.id}`
        });
    }
});

module.exports = router;