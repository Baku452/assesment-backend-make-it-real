require('dotenv').config();
const ListFavs = require('./listFavs.model')

async function getAllLists(req, res) {
  try {
    const lists = await ListFavs.find({user: req.user.id}).populate('items').select('name');;
    res.status(200).json({ lists });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

async function retrieveList(req, res) {
    const { id } = req.params;
    try {
        const list = await ListFavs.findById(id);
        res.status(200).json(list);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err });
    }
}

async function createList(req, res) {
    const data = req.body;
    const user = req.user;
    const { name } = data;
    try {
        const searchDuplicateList = await ListFavs.find({name: {$in: name}});
        if(searchDuplicateList.length > 0){
            return res.status(400).json({error: "Cannot create List Duplicate name"});
        }
        const listSaved = await ListFavs.create({...data, user:user._id});
        return res.status(200).json(listSaved)
        
    } catch(err) {
        console.log(err),
        res.status(400).json({ error: err})
    } 
}

async function updateList(req, res) {
    const { id } = req.params
    const data = req.body;
    try {
        const list = await ListFavs.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json(list)
    } catch(err) {
        res.status(400).json({ error: err})
    }
}

async function deleteList(req, res) {
    const { id } = req.params;
    try {
        const list = await ListFavs.findByIdAndDelete(id);
        res.status(200).json({ message: "Item deleted succesfully", list });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getAllLists,
    retrieveList,
    createList,
    updateList,
    deleteList,
};
