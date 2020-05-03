const mongoose = require('mongoose')
const Schema = mongoose.Schema;

require('../database/mongoose')

const VoteSchema = new Schema({
    os: {
        type: String, 
        required: true 
    },
    points: {
        type: String, 
        required: true 
    }
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;