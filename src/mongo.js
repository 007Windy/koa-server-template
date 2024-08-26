const mongoose = require('mongoose')

const tryConnect = () => {
    
    // return mongoose.connect('mongodb://127.0.0.1:27017/20240812?authSource=admin')
    return mongoose.connect('mongodb://root:123456@127.0.0.1:27017/20240813?authSource=admin')
}

const Model = (name, schema) => {
    return mongoose.model(name, new mongoose.Schema(schema), name)
}

module.exports = {
    tryConnect,
    Model
}