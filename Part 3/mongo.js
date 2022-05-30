const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
//node mongo.js yourpassword Anna 040-1234556
const url =
  `mongodb+srv://lucasfullstack:${password}@cluster0.gwtdx.mongodb.net/personApp?retryWrites=true&w=majority`
//dbname-- mongodb+srv://lucasfullstack:<password>@cluster0.gwtdx.mongodb.net/<dbname>?retryWrites=true&w=majority
if (process.argv.length < 3) {
  console.log('node mongo.js <password>')
  process.exit(1)
}
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
Person
  .find({})
  .then(result=> {
    result.forEach(person => {
        console.log(person)
      })
    mongoose.connection.close()
  })
}

if (process.argv.length > 3){
    const person = new Person({
        name: name,
        number: number,
    })

person.save().then(result => {
  console.log('${name} number ${number} saved!')
  mongoose.connection.close()
})}