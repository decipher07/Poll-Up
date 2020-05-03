const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('POLL')
});

router.post('/', (req, res) => {
    
})

module.exports = router ;
