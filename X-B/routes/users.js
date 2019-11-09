var express = require('express');
var router = express.Router();
// const useroperation = require('../crud/userCrud');
const bcrypt = require('bcrypt');
const saltRound = 10;
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
const Manager = require('../models/user')
const jwt = require('jsonwebtoken');
const secretKey = "let's battle begin"
/* GET users listing. */
router.get('/dashboard',verifyToken, function (req, res, next) {
  // res.send('respond with a resource');
  jwt.verify(req.token,secretKey,(err,authData)=>{
    console.log("i am in verifyToken",req.token);
      if(err){
        res.json({err:'not found'});
      }
      else{
        res.json({message:'created',
      authResult:authData})
      }
  })
});

router.post('/login', (req, res) => {
  const json = req.body;
  console.log("i ma in login route")
  Manager.findOne({ email: json.email }, (err, user) => {
    if (err) {
      res.status(400).json({ message: "user not found", err });
    }
    else {
      if (user) {
        bcrypt.compare(json.password, user.password, (err, resp) => {
          console.log("========", json.password, "and ", user.password);
          if (err) {
            res.status(400).json({
              error: err
            })
          }

          else {
            if (resp) {
              let payload = {
                user: user.email,
                password:user.password
              }
              jwt.sign(payload, secretKey, (err, token) => {
                if (err) {
                  console.log("error is", err);
                  res.status(404).json(({ message: "error is", err }))
                }
                else {
                  
                  res.status(200).json({ message: token })
                }
              })
            }
          }
        })
      }
    }
  })
});

router.post('/signup', (req, res) => {

  const json = req.body;
  console.log("i am here in signup route")
  console.log("+++++++", json);
  let userData = {}
  userData.email = json.email
  userData.name = json.name
  if (json.email, json.password) {
    bcrypt.genSalt(saltRound, (err, salt) => {
      if (err) {
        console.log("in signup bycrypt routing ", err);
        res.status(400), json({ error: err })
      } else {
        validatePassword(json.password).then(resp => {
          bcrypt.hash(json.password, salt).then((hash) => {
            userData.password = hash;
            let user = new Manager(userData)

            user.save(function (err, registeredUser) {
              if (err) {
                res.status(400).json({
                  error: err
                });
              } else {
                res.status(200).json({
                  opration: true,
                  result: registeredUser
                })
              }
            })
            console.log("my user data", userData)
          })
        })
      }
    })
  }


})



schema
  .is().min(8)
  .is().max(20)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .is().not().oneOf(['password', 'passw0rd', 'Password123'])

function validatePassword(password) {
  return new Promise((resolve, reject) => {
    var error = schema.validate(password, { list: true })
    if (error.length > 0) {
      reject(error)
    }
    else {
      resolve({ opration: true })
    }
  })
}
function verifyToken(req,res,next){
// get header value
const bearerHeader = req.headers['authorization'];
console.log(" i ma in bearer",bearerHeader);
if(typeof bearerHeader !='undefined'){
  
const bearer= bearerHeader.split(' ');
const bearerToken= bearer[1];
req.token=bearerToken;
next();
}
else{
  res.sendStatus(403);
}
}

module.exports = router;
