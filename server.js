const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const {PORT, DATABASE_URL} = require('./config')
const {Post} = require('./models')

const app = express()
app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    Post
        .find()
        .exec()
        .then(posts => {
          res.json({
              posts: posts.map(
                  (post) => post.apiRepr())
          })
      })
        .catch(
          err => {
              console.error(err)
              res.status(500).json({message: 'Uh Oh! Internal server error'})
        })
})

app.get('/posts/:id', (req, res)=>{
    Post
        .findByID(req.params.id)
        .then(post => res.json(post.apiRepr()))
        .catch(err =>{
            console.error(err)
            res.status(500).json({message: 'Post not found'})
        })
})