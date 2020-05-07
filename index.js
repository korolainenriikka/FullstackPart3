const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


morgan.token('body', function (req, res) {
    if(req.method=== 'POST'){
      return JSON.stringify(req.body) 
    }
  })

app.get('/info', (req, res) => {
  console.log(res.body)
  const info = (
    `<p>Phonebook has info for ${numbers.length} people</p>
    <p>${new Date()}</p>`
  )
  res.send(info)
})

app.get('/api/persons', (req, res) => {
  res.send(numbers)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = numbers.find(person => person.id === id)

  if (person){
    res.send(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  numbers = numbers.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  console.log(res.body)
  if(!req.body.name || !req.body.number){
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  console.log(numbers.find(person => person.name === req.body.name))
  if(numbers.find(person => person.name === req.body.name)){
    return res.status(418).json({
      error: 'the name is already in the phonebook'
    })
  }
  const id = Math.floor((Math.random() * 1000))
  const newPerson = req.body
  newPerson.id = id
  numbers = numbers.concat(newPerson)
  res.json(newPerson)
})

let numbers = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 4
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
]


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})