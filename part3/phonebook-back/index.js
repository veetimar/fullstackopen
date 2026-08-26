require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

app.use(express.static('dist'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(result => {
        res.json(result)
    }).catch(e => {
        res.status(404).end()
    })
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
        id: String(Math.floor(Math.random() * 1000000))
    }
    persons.push(person)
    res.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
