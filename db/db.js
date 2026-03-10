const mongo=require('mongoose')
require('dotenv').config()
mongo.connect(process.env.URL_DB)
.then(()=>{
    console.log('conection successfully')
})
.catch((error)=>{
    console.log('error conaction0',error)
})

module.exports=mongo
