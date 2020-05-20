require('dotenv').config()
const A= process.env;
const env={
   mongo1: `${A.DB_URL+A.DB_PASS+A.DB_CLUSTER}`,
}
console.log("first",env.mongo1);


module.exports=env.mongo1;