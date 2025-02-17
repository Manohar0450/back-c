const express = require('express')
const mongoose = require('mongoose')

const LoginDetails = new mongoose.Schema({
    userName : {
        type : String
    },
    Password : {
        type : String
    }
});

module.exports = mongoose.model('LoginDetails', LoginDetails)