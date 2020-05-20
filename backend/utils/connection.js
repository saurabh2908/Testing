const mongoose = require('mongoose');
const mongoURl = require('../utils/url');
 mongoose.connect(mongoURl, {useNewUrlParser: true});
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });

module.exports=mongoose;

