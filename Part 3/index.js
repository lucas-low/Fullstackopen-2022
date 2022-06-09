require('dotenv').config();
const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


morgan.token('object', function (req, res) { 
  console.log('object' , req.body)
  return `${JSON.stringify(req.body)}` })

app.use(morgan(':method :url :status :response-time ms :req[header] object'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})
app.get('/api/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${Date()}</p>
  `)
  })
app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
            response.status(404).end()
        }
      })
        .catch(error => next(error))
    })
    
app.delete('/api/persons/:id', (request, response, next) => {
      Person.findByIdAndRemove(request.params.id)
          .then((result) => {
            if (result) {
              response.status(204).end()
            } else {
              response.status(404).end()
            }
          })
          
          .catch(error => next(error))
        })
//saving contact input into database
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing'})}
  if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' })
    }
  let person = new Person({
    id: Math.floor(Math.random() * 999999),
    name: body.name,
    number: body.number,
  })
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
      
  })
  
//update duplicate name of existing entry
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
  name: body.name,
  number: body.number,
}
Person.findByIdAndUpdate
(request.params.id, person, 
  { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson.toJSON)
  }}
)
   .catch(error => 
    next(error)
)})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
 
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`)
        })