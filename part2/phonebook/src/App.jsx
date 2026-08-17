import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsToShow, setPersonsToShow] = useState([...persons])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
      setPersons(persons.concat(newPerson))
      if (contains(newName, newFilter)) {
        setPersonsToShow(personsToShow.concat(newPerson))
      }
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with <input value={newFilter} onChange={handleFilter} />
      </p>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => <div key={person.id}>{person.name} {person.number} <br /></div>)}
    </div>
  )
}

export default App
