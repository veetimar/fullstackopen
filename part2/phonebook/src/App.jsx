import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    margin: 10
  }

  return (
    <div style={style}>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  )
}

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
  const [message, setMessage] = useState(null)

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
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setMessage(null), 5000)
      })
    } else {
      if (confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const newPerson = { ...persons.find((person) => person.name === newName), number: newNumber }
        personService.updatePerson(newPerson.id, newPerson).then((updatedPerson) => {
          console.log(`Updated ${updatedPerson.name}`)
          setPersons(persons.map((person) => person.id === updatedPerson.id ? updatedPerson : person))
          setPersonsToShow(personsToShow.map((person) => person.id === updatedPerson.id ? updatedPerson : person))
          setMessage(`Edited ${updatedPerson.name}`)
          setTimeout(() => setMessage(null), 5000);
        })
      }
    }
    setNewName('')
    setNewNumber('')
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
      <Notification message={message} />
      <Filter newFilter={newFilter} handleFilter={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleName={handleNameChange} newNumber={newNumber} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={handlePersonDeletion}/>
    </div>
  )
}

export default App
