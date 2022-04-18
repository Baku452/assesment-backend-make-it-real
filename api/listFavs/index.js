const { Router } = require('express');
const { getAllLists, retrieveList, createList, updateList, deleteList,} = require('./listFavs.controller')
const { isAuthenticated } = require('../auth/auth.service')
const router = Router()

//CRUD
//GET
router.get('/', isAuthenticated, getAllLists)
router.get('/:id', retrieveList)
//Post
router.post('/', isAuthenticated, createList)
//Modify
router.put('/:id', updateList)
//Delete
router.delete('/:id', deleteList)


module.exports = router
