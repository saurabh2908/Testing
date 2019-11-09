const mongoose = require('./connection');
const mongooses= require('mongoose');
const Schema = mongooses.Schema;
// console.log("schema is",Schema);
var express = require('express');

var router = express.Router();
const userSchema = new Schema({

  'email': { type: String, unique: true, required: true },
  'name': { type: String },
  'password': { type: String, unique: true, required: true }
})

// const personSchema = Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   age: Number,
//   stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });

const storySchema = Schema({
  merge: { type: Schema.Types.ObjectId, ref: 'Data' },
  title: String,
  // fans: [{ type: Schema.Types.ObjectId, ref: 'Data' }]
});

const merge = Schema({
  _id: Schema.Types.ObjectId,
 name:String,
//  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const Story = mongoose.mongoose1.model('Story',storySchema)
// const Person = mongoose.mongoose1.model('Person', personSchema);
const Merge= mongoose.mongoose2.model('Data',merge)
// const userModel = mongoose.model('User', userSchema);
// const storyModel=mongoose.model('Story',storySchema);
// const personModel=mongoose.model('Person',personSchema)
router.post('/types', function (req, res) {
  const merge= new Merge({
    _id: new mongooses.Types.ObjectId(),
    name:"saurabh singh"
  });
  merge.save(function(err){
    if(err) return handleError(err);
  
  // const author = new Person({
  //   _id: new mongooses.Types.ObjectId(),
  //   name: 'Ian Fleming',
  //   age: 50
  // });
  // author.save(function (err) {
  //   if (err) return handleError(err);

    const story1 = new Story({
      title: 'Casino Royale',
      merge: merge._id    // assign the _id from the person
    });

    story1.save(function (err) {
      if (err) return handleError(err);
      // thats it!
    });
  });
})

router.get('/mydata', function (req, res) {
  Story.
    find().
    populate({path:'merge',model:Merge}).
    exec(function (err, story) {
      if(err){
        console.log(err)
      }
      else{
        console.log(story);
      }
      // prints "The author is Ian Fleming"
    });
})




module.exports = router;
// module.exports = {
//   userSchema: userModel,
//   storyModel: storyModel,
//   personModel: personModel
// }