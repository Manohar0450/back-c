const express = require('express');
const router = express.Router();
const { fetchData, handleFileUpload, deleteFile, fetchSubjects } = require('../Controllers/fetchData');
const { Verify, ChangePassword, ChangeUserName } = require('../Controllers/AdminLogin');

// Route to fetch data from Google Drive
router.post('/fetchdata', fetchData);

// Route to handle file upload
router.post('/upload', handleFileUpload);

// Route to delete a file by ID
router.delete('/delete/:fileId', deleteFile);  // :fileId is the placeholder for the file ID

// Route to fetch subjects
router.post('/fetchsubjects', fetchSubjects);

// Route to handle admin login
router.post('/adminlogin', Verify);

// Route to change password
router.post('/changepassword', ChangePassword);

// Route to change username
router.post('/changeusername', ChangeUserName);

module.exports = router;
