const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // _id: 
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    mainPepper: { type: String, required: false, default: '' },
    imageUrl: { type: String, required: false, default: '' },
    heat: { type: Number, required: false, default: 0 },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: [String], required: false, default: [] },
    usersDisliked: { type: [String], required: false, default: [] },  //Tableau de string

});

module.exports = mongoose.model('Sauce', sauceSchema);

