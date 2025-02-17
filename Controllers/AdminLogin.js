const express = require('express')
const mongoose = require('mongoose')

const MyLoginDeatils = require('../Models/LoginCredential');


const Verify = async(req, res) => {
    const UserName = req.body.username;
    const Password = req.body.password;
    console.log(UserName, Password);
    const Admin = await MyLoginDeatils.aggregate([
        {
            $match : {
                userName : UserName,
                Password : Password
            }
        }]);
    console.log(Admin);
    if(Admin.length > 0){
        return res.status(200).json({message : "Login Successfull"});
    }
    return res.status(404).json({message: 'login Failed'});
}

const ChangePassword = async(req, res) => {
    const UserName = req.body.userName;
    const Password = req.body.MainPassword;
    const NewPassword = req.body.ChangePassword;
    console.log(UserName, Password, NewPassword);
    if(Password === 'Meda@Aiml'){
        const updatedUser = await MyLoginDeatils.updateOne(
            { userName: UserName },  // match the user by username
            { $set: { Password: NewPassword } }  // update the password
        );
        if(updatedUser === 0){
            return res.status(404).json({message : "User Not Found"});
        }
        return res.status(200).json({message : "Password Changed Successfully"});
    }
    return res.status(500).json({message : "Password Not Changed"});
}


const ChangeUserName = async(req, res) => {
    const UserName = req.body.userName;
    const Password = req.body.Password;
    const NewUserName = req.body.ChangeUserName;
    console.log(UserName, Password, NewUserName);
    
    const updatedUser = await MyLoginDeatils.updateOne(
        { userName: UserName, Password: Password },  // match the user by username
        { $set: { userName: NewUserName } }  // update the password
    );
    if(updatedUser === 0){
        return res.status(404).json({message : "User Not Found"});
    }
    return res.status(200).json({message : "UserName Changed Successfully"});
}

module.exports = {Verify, ChangePassword, ChangeUserName}