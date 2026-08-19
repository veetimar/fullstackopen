import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({ persons, deletePerson }) => {
  return (persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button> <br />
    </div>))
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log("Got initial persons from server")
      setPersons(initialPersons)
      setPersonsToShow(initialPersons)
    })
  }, [])

  const contains = (string, substring) => string.toLocaleLowerCase().includes(substring.toLocaleLowerCase())

  const handleFilterChange = (event) => {
    const filter = event.target.value
    setPersonsToShow(persons.filter((person) => contains(person.name, filter)))
    setNewFilter(filter)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!persons.find((person) => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber }
      personService.createPerson(newPerson).then((returnedPerson) => {
        console.log(`Created ${newPerson.name}`)
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

  const handlePersonDeletion = (id) => {
    if (confirm(`Delete ${persons.find((person) => person.id == id).name}?`)) {
      personService.deletePerson(id).then((deletedPerson) => {
        console.log(`Deleted ${deletedPerson.name}`)
        setPersons(persons.filter((person) => person.id !== id))
        setPersonsToShow(personsToShow.filter((person) => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleName={handleNameChange} newNumber={newNumber} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={handlePersonDeletion}/>
    </div>
  )
}

export default App
