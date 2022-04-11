// import mongoose
const mongoose = require('mongoose')

// create schema object
const Schema = mongoose.Schema

// assign elements to schema object
const orderSchema = new Schema({
    products:[
        {
            product: { type: Object, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
})

// export schema
module.exports = mongoose.model('Order', orderSchema)