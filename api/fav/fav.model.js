const mongoose = require('mongoose')

const FavSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        link: String,
        list: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "ListFav"
            }
        ],
    }
)

module.exports = mongoose.model('Fav', FavSchema)