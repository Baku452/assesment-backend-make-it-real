const { Router } = require('express');
const { getAllItems, retrieveItem, createItem, updateItem, deleteItem,} = require('./fav.controller')
const { isAuthenticated } = require('../auth/auth.service')
const router = Router()

//CRUD
//GET
router.get('/', getAllItems)
router.get('/:id', isAuthenticated, retrieveItem)
//Post
router.post('/', isAuthenticated, createItem)
//Modify
router.put('/:id', isAuthenticated,updateItem)
//Delete
router.delete('/:id', deleteItem)


module.exports = router
