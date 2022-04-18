const mongoose = require('mongoose')

const ListFavSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        
        items: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Fav"
            }
        ],
        user: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            }
        ],
    }
)

module.exports = mongoose.model('ListFav', ListFavSchema)