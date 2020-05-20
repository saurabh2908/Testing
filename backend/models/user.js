const mongoose = require('../utils/connection');
const Univmongoose= require('mongoose');
const Schema = Univmongoose.Schema;
// console.log("schema is",Schema);
var express = require('express');

var router = express.Router();
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  my:{type:Schema.Types.ObjectId, ref:'My'},
  name: String,
  age: Number,
  stories: { type: Schema.Types.ObjectId, ref: 'Story' }
});
mySchema=Schema({
    _id:Schema.Types.ObjectId,
    email:String,
    phone:Number,
    person:{type:Schema.Types.ObjectId, ref:'Person'}
})
const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: { type: Schema.Types.ObjectId, ref: 'Person' }
});

const Story = mongoose.model('Story',storySchema)
const Person= mongoose.model('Data',personSchema)
const My = mongoose.model('my',mySchema)

router.post('/types', function (req, res) {
    
    const my= new My({
        _id:new mongoose.Types.ObjectId(),
         email:'saurabhsingh836847@gmail.com',
         phone:9871123546 
      })
    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        my:my._id,
        name: 'Ian Fleming',
        age: 50
      });
      
      author.save(function (err) {
        if (err) return handleError(err);
      
        const story1 = new Story({
          title: 'Casino Royale',
          author: author._id    // assign the _id from the person
        });
      
        story1.save(function (err) {
          if (err) return handleError(err);
          // that's it!
        });
       
          my.save(function(err){
              if(err) return handleError(err);
          })
      });

      
})

router.get('/mydata', function (req, res) {
  Story.
    find().
   populate({
       path:'author',
       model:Person,
       populate:({
           path:'my',
           model:My
       })
   }).
    exec(function (err, story) {
      if(err){
        console.log(err)
      }
      else{
        console.log(story);
        console.log("++++++++");
        res.json(story)
        // console.log(story.populate('author'))
      }
    //   prints "The author is Ian Fleming"
    });
})




module.exports = router;
// module.exports = {
//   userSchema: userModel,
//   storyModel: storyModel,
//   personModel: personModel
// }