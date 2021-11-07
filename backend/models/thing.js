const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // _id: 
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: String, required: true },
    usersDisliked: { type: String, required: true },

    email: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);

/*let Id = "1A2E";

thingSchema.find({ _id : Id })


thingSchema.find({ manufacturer: "Heintz" , likes: { $gte: 3 } , dislikes: 4 }) //méthode filter

thingSchema.findById(Id)*/