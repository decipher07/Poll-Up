const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000 

const app = express();

const poll = require('./routers/poll');

// Set Public Folder 
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

//Setting Up Cors 
app.use(cors());

// Setting Up Routes
app.use('/poll', poll);

app.listen(port , (req, res) => {
    console.log(`Server Running at Port ${port}`);
})