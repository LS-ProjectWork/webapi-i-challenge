// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
server.use(express.json())

server.listen(5000, () => {
    console.log('It works')
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    if (newUser.name && newUser.bio) {
        db.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        }) 
        .catch(err => {
            res.status(500).json({error: 'There was an error while saving the user to the database'})
        })
    } else {
        res.status(400).json({error: 'Please provide name and bio for the user.'})
    }
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({error: 'The users information could not be retrieved'})
    })
})

server.get('/api/users/:id', (req, res) => {
    userId = req.params.id
    if(userId) {
        db.findById(userId)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({error: 'The user information could not be retrieved'})
        })
    } else {
        res.status(404).json({error: 'The user with the specified ID does not exist'})
    }
})

server.delete('/api/users/:id', (req, res) => {
    userId = req.params.id
    if(userId) {
        db.remove(userId)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({error: 'The user could not be removed'})
        })
    } else {
        res.status(404).json({error: 'The user with the specified ID does not exist'})
    }
})

server.put('/api/users/:id', (req, res) => {
    userId = req.params.id
    changes = {}
    if(userId) {
        db.update(userId, changes)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(() => {
            res.status(500).json({error: 'The user information could not be modified'})
        })
    }
})