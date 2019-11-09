const userModel = require('../models/user');

const useroperations = {
    signup(object, response) {
       console.log("object in sign up is",object);
        userModel.create(object, (err, doc) => {

            if (err) {
                response.json({ message: "error while creating an account",err })
            }
            else {
               
                response.json({ message: "your account created sccessfully", result: doc })
            }
        })
    },

    login(object, response) {
        let user={
            email:object.email,
            password:object.password
        }
        
        userModel.findOne(user, (err, doc) => {
            console.log("email is",object.email,"password is",object.password);

            if (err) {
                response.json({ message: "error while finding an account" })
            }
            else {
               
                response.json({ message: `hey ${doc.name}`, result: doc })
            }
        })
    }
}
module.exports = useroperations;