const express = require('express');
const router = express.Router();

// Pusher 
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '994296',
    key: '7b2208005f69a9cba185',
    secret: '16508dda9b12ca0a45ef',
    cluster: 'ap2',
    encrypted: true
  });

router.get('/', (req, res) => {
    res.send('POLL')
});

router.post('/', (req, res) => {
    pusher.trigger('os-poll', 'os-event', {
        points: 1,
        os: req.body.os 
    });

    return res.json({success: true, message: 'Thank You For Voting'});

})

module.exports = router ;
