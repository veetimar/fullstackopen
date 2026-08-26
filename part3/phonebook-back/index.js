require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
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

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => {
        res.json(result)
    }).catch(e => next(e))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id).then(result => {
        if (!result) {
            return res.status(404).json({ error: 'person not found' })
        }
        res.json(result)
    }).catch(e => next(e))
})

app.get('/info', (req, res) => {
    let html = `<p>Phonebook has info for ${persons.length} people</p>`
    html += `<p>${Date()}</p>`
    res.send(html)
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(result => {
        res.status(204).end()
    }).catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const { name, number } = req.body
    Person.findById(id).then(person => {
        if (!person) {
            return res.status(404).json({ error: 'person not found' })
        }
        person.name = name
        person.number = number
        person.save().then(result => {
            res.json(result)
        })
    }).catch(e => next(e))
})

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body

    if (!name) {
        return res.status(400).json({ error: "name missing" })
    }
    if (!number) {
        return res.status(400).json({ error: "number missing" })
    }
    // if (persons.find((person) => person.name === name)) {
    //     return res.status(400).json({ error: "name must be unique" })
    // }

    const person = new Person({
        name,
        number,
    })

    person.save().then(result => {
        res.json(result)
    }).catch(e => next(e))
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
