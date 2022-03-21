const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')

// ini untuk creat post
router.post('/post', postController.CreatePost)
// ini untuk melihat post semuanya
router.get('/post', postController.GetPost)
// ini untuk melihat post berdasarkan id
router.get('/post/:id', postController.GetPostById)
// ini untuk Edit post
router.put('/post/:id', postController.EditPost)
// ini untuk Deleted post
router.delete('/post/:id', postController.DeletePost)

module.exports = router