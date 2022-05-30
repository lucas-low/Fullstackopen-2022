const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//dbname-- mongodb+srv://lucasfullstack:<password>@cluster0.gwtdx.mongodb.net/<dbname>?retryWrites=true&w=majority

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type:String,
      minlength: 3,
      required: true
    },
    number: {
      type:String,
      minlength: 8,
      required: true,
      //regex to allow only numbers matching ##-#### & ###-####
      validate: {
        validator: (v) => {
          return /^\d{2,3}-\d+$/.test(v)
        },
        message: "invalid format, only ##-#### & ###-####"
      }
}})

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema)