const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find((person) => person.id === id)
    if (!person) {
        return res.status(404).end()
    }
    res.json(person)
})

app.get('/info', (req, res) => {
    let html = `<p>Phonebook has info for ${persons.length} people</p>`
    html += `<p>${Date()}</p>`
    res.send(html)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter((person) => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const name = req.body.name
    const number = req.body.number

    if (!name) {
        return res.status(400).json({ error: "name missing" })
    }
    if (!number) {
        return res.status(400).json({ error: "number missing" })
    }
    if (persons.find((person) => person.name === name)) {
        return res.status(400).json({ error: "name must be unique" })
    }

    const person = {
        name,
        number,
        id: Math.floor(Math.random() * 1000000)
    }
    persons.push(person)
    res.json(person)
})

app.listen(3001)
