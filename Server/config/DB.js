
mongoose = require('mongoose')

 const DBconfig = {
    DB: 'mongodb://vik80sh:vik80sh@cluster0-shard-00-00-lhkd1.mongodb.net:27017,cluster0-shard-00-01-lhkd1.mongodb.net:27017,cluster0-shard-00-02-lhkd1.mongodb.net:27017/Weather?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    secretOrKey:'Secret'
 }
 module.exports={DBconfig}

