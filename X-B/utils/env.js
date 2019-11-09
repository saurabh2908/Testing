require('dotenv').config()
const A= process.env;
const env={
   mongo1: `${A.DB_URL+A.DB_PASS+A.DB_CLUSTER}`,
   mongo2:`${A.SEC_DB_URL+A.SEC_DB_PASS+A.SEC_DB_CLUSTER}`
}
console.log("first",env.mongo2);
console.log("second",env.mongo1);

module.exports={
   env1:env.mongo1,
   env2:env.mongo2
    };