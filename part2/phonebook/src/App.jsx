import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      <p>
        filter shown with <input value={props.newFilter} onChange={props.handleFilter} />
      </p>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.newName} onChange={props.handleName} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ persons }) => {
  return (persons.map((person) => <div key={person.id}>{person.name} {person.number} <br /></div>))
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
  }, [])

  const contains = (string, substring) => string.toLocaleLowerCase().includes(substring.toLocaleLowerCase())

  const handleFilter = (event) => {
    const filter = event.target.value
    setPersonsToShow(persons.filter((person) => contains(person.name, filter)))
    setNewFilter(filter)
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!persons.find((person) => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber }
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then((response) => {
          const returnedPerson = response.data
          setPersons(persons.concat(returnedPerson))
          if (contains(newName, newFilter)) {
            setPersonsToShow(personsToShow.concat(returnedPerson))
          }
        })
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
