const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const repoSchema = new Schema ({
    repoId: {
        type: Number, 
        required: true
    }, 
    comment:{
        type: String,
        required: false
    },
})

const Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;