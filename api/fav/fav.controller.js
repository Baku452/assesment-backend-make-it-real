require('dotenv').config();
const Fav = require('./fav.model')
const ListFavs = require('../listFavs/listFavs.model')

async function getAllItems(req, res) {
  try {
    const items = await Fav.find({});
    res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

async function retrieveItem(req, res) {
    const { id } = req.params;
    try {
        const user = await Fav.findById(id).populate('items');
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err });
    }
}

async function createItem(req, res) {
    const data = req.body;
    const { list } = data;

    try {
        const fav =  new Fav (data)
        const foundList= await ListFavs.findOne({name: {$in: list}});
        console.log(foundList);
        if(foundList){
            fav.list = foundList._id;
            const favSaved = await Fav.create(fav);
            foundList.items = foundList.items.concat(favSaved.id);
            await foundList.save();

            return res.status(200).json(favSaved)
        }else{
            return res.status(400).json({error: "Please select a valid list"})
        }
        } catch(err) {
            console.log(err);
            res.status(400).json({ error: err})
    } 
}

async function updateItem(req, res) {
    const { id } = req.params
    const data = req.body;
    try {
        const item = await User.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json(item)
    } catch(err) {
        res.status(400).json({ error: err})
    }
}

async function deleteItem(req, res) {
    const { id } = req.params;
    try {
        const item = await Fav.findByIdAndDelete(id);
        res.status(200).json({ message: "Item deleted succesfully", item });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getAllItems,
    retrieveItem,
    createItem,
    updateItem,
    deleteItem,
};
