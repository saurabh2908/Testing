var express = require('express');
var router = express.Router();
const Manager = require('../models/user');
const mongoose = require('mongoose');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
var json = {
  // _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
}
router.post('/author', (res) => {
  

  let user = new Manager.personModel(json)
  user.save(function (err, resp) {
    if (err) {
      res.json({
        error: err
      });
    }
    else {
      res.json(
        { result: resp }
      )
    }
  })
})

router.post('/story', (req, res) => {
  jsonAuthor = {
    title: 'Casino Royale',
    // author: json._id
  }
  console.log("i am in story post", json)
  let user = new Manager.storyModel(jsonAuthor)
  user.save((json), function (err, result) {
    if (err) {
      res.status(404).json({ error: 'not found' })
    }
    else {
      res.status(200).json({ result: result })
    }
  })
})

router.get('/data',(req,res)=>{
  let user = Manager.storyModel;
  user.findOne({ title: 'Casino Royale' }).
  populate('peoples').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story);
    // prints "The author is Ian Fleming"
  });
})
module.exports = router;
