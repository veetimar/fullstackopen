const mongoose = require('mongoose')

const password = process.argv[2]

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@cluster0.da3mnjn.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(result => {
        mongoose.connection.close()
        console.log(`added ${result.name} number ${result.number} to phonebook`)
    })
} else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        mongoose.connection.close()
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name)
            console.log(person.number)
        })
    })
}
