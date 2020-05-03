const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const voteModel = require('../models/vote')

// Pusher 
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '994296',
    key: '7b2208005f69a9cba185',
    secret: '16508dda9b12ca0a45ef',
    cluster: 'ap2',
    encrypted: true
  });

router.get('/', async (req, res) => {
    res.send('POLL')
});

router.post('/', async (req, res) => {

    const newVote = new voteModel({
        os: req.body.os,
        points: 1
    });

    await newVote.save();

    pusher.trigger('os-poll', 'os-event', {
        points: parseInt(newVote.points),
        os: req.body.os 
    });

    return res.json({success: true, message: 'Thank You For Voting'});

})

module.exports = router ;
