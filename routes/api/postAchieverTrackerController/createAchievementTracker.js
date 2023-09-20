const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require("mongodb").ObjectId;
const CryptoJS = require('crypto-js')

const ACT = require('../../../models/ACT');
const Student_APIB_Test = require('../../../models/Student_APIB_Test');
const Award = require('../../../models/Award');
const College = require('../../../models/College');
const College_Application = require('../../../models/College_Application');
const Extracurricular = require('../../../models/Extracurricular');
const SAT = require('../../../models/SAT');
const Student_extracurricular = require('../../../models/Student_extracurricular');
const Test = require('../../../models/Test');
const User = require('../../../models/User');
const handleError = require("../../../utils/errorHandler");
const {encryptData} = require("../../../utils/authHandler")

router.post('/decrypt', (req, res) => {
    const tokenSecretKey = "3f1c5d283446599517d02007e306df5209bdf697aba063d46d48aaf7d0a584e5"
    const { encryptedData } = req.body;
  
    if (!encryptedData) {
      return res.status(400).json({ message: 'Encrypted data missing' });
    }
  
    try {
      const decryptedData = JSON.parse(CryptoJS.AES.decrypt(encryptedData, tokenSecretKey).toString(CryptoJS.enc.Utf8));
      return res.status(200).json({ decryptedData });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Decryption error' });
    }
  });

router.post("/create/ACT", async (req, res) => {
    try {
        const testDate = req.body.date;
        const userID = req.body.user_id;
        
        const userObjId = new Object(userID);
        const user = await User.findById(userObjId);

        if(!user){
            return res.status(400).send({error: "User does not exist"});
        }
    
        const ACTQuery = await ACT.findOne({$and: [{date : testDate}, {user_id: userID}]});
    
        if(ACTQuery){
            return res.status(400).send({error: "ACT exam for this student already exists"});
        }
        else{
            const newACT = new ACT(req.body);
            newACT.save().catch(error => console.log(error));
            return res.status(200).send(newACT);
        }
    } catch (error) {
        handleError(error, res);
    }
})

router.post("/create/APIB_test", async (req, res) => {
    try{
        const testDate = req.body.date;
        const testName = req.body.name;
        const userID = req.body.user_id;

        const userObjId = new Object(userID);
        const user = await User.findById(userObjId);

        if(!user){
            return res.status(400).send({error: "User does not exist"});
        }

        const APIB_testQuery = await Student_APIB_Test.findOne({$and: [{date : testDate}, {name: testName}, {user_id: userID}]});

        if(APIB_testQuery){
            return res.status(400).send({});
        }
        else{
            const newAPIB_test = new Student_APIB_Test(req.body);
            newAPIB_test.save().catch(error => console.log(error));
            return res.status(200).send(newAPIB_test);
        }
    }
    catch (error) {
        handleError(error, res);
    }


    
})

router.post("/create/award", async (req, res) => {
    try{
        const awardName = req.body.name;
        const awardOrg = req.body.organization;
        const awardLevel = req.body.level;
        const userID = req.body.user_id;

        const userObjId = new Object(userID);
        const user = await User.findById(userObjId);

        if(!user){
            return res.status(400).send({error: "User does not exist"});
        }
    
        const awardQuery = await Award.findOne({$and: [{name : awardName}, {organization: awardOrg}, {level: awardLevel}, {user_id: userID}]});
    
        if(awardQuery){
            return res.status(400).send({});
        }
        else{
            const newAward = new Award(req.body);
            newAward.save().catch(error => console.log(error));
            return res.status(200).send(newAward);
        }
    }
    catch (error) {
        handleError(error, res);
    }
})

router.post("/create/college/application", async (req, res) => {
    try{
        const collegeName = req.body.name;
        const applicationYear = req.body.year_applied;
        const userID = req.body.user_id;

        const userObjId = new Object(userID);
        const user = await User.findById(userObjId);

        if(!user){
            return res.status(400).send({error: "User does not exist"});
        }
    
        const collegeApplicationQuery = await College_Application.findOne({$and: [{name : collegeName}, {user_id: userID}, {year_applied: applicationYear}]});
    
        if(collegeApplicationQuery){
            return res.status(400).send({});
        }
        else{
            const newCollegeApplication = new College_Application(req.body);
            newCollegeApplication.save().catch(error => console.log(error));
            return res.status(200).send(newCollegeApplication);
        }
    }
    catch (error) {
        handleError(error, res);
    }
})

router.post("/create/college", async (req, res) => {
    try{
        const collegeName = req.body.name;

        const collegeQuery = await College.findOne({name: collegeName});

        if(collegeQuery){
            return res.status(400).send({});
        }
        else{
            const newCollege = new College(req.body);
            newCollege.save().catch(error => console.log(error));
            return res.status(200).send(newCollege);
        }
    }
    catch(error){
        handleError(error, res);
    }
})

router.post("/create/extracurricular", async (req, res) => {

    try{
        const ecName = req.body.name;
        const ecDescription = req.body.description;

        const ecQuery = await Extracurricular.findOne({$and: [{name : ecName}, {description: ecDescription}]});

        if(ecQuery){
            return res.status(400).send({});
        }
        else{
            const newEC = new Extracurricular(req.body);
            newEC.save().catch(error => console.log(error));
            return res.status(200).send(newEC);
        }
    }
    catch (error) {
        handleError(error, res);
    }
    
})

router.post("/create/test", async (req, res) => {
    try{
        const testName = req.body.name;
        
        const testQuery = await Test.findOne({name: testName});

        if(testQuery){
            return res.status(400).send({});
        }
        else{
            const newTest = new Test (req.body);
            newTest.save().catch(error => console.log(error));
            return res.status(200).send(newTest);
        }
    }
    catch(error){
        handleError(error, res);
    }
})

router.post("/create/SAT", async (req, res) => {

    try{
        const testDate = req.body.date;
        const userID = req.body.user_id;
    
        const userObjId = new Object(userID);
        const user = await User.findById(userObjId);
    
        if(!user){
            return res.status(400).send({error: "User does not exist"});
        }
    
        const SATQuery = await SAT.findOne({$and: [{date : testDate}, {user_id: userID}]});
    
        if(SATQuery){
            return res.status(400).send({});
        }
        else{
            const newSAT = new SAT(req.body);
            newSAT.save().catch(error => console.log(error));
            return res.status(200).send(newSAT);
        }
    }
    catch(error){
        handleError(error, res);
    }
    
})

router.post("/create/student/extracurricular", async (req, res) => {

    try{
        const studentEcName = req.body.name;
        const studentEcDescription = req.body.description;
        const userID = req.body.user_id;
        const studentEcID = req.body.extracurricular_id;
    
        const userObjId = new Object(userID);
        const user = await User.findById(userObjId);
        
        if(!user){
            return res.status(400).send({error: "User does not exist"});
        }
    
        const studentEcQuery = await Student_extracurricular.findOne({$and: [{name : studentEcName}, {description: studentEcDescription}, {user_id: userID}, {extracurricular_id: studentEcID}]});
    
        if(studentEcQuery){
            return res.status(400).send({});
        }
        else{
            const newStudentEc = new Student_extracurricular(req.body);
            newStudentEc.save().catch(error => console.log(error));
            return res.status(200).send(newStudentEc);
        }
    }
    catch(error){
        handleError(error, res);
    }
})

router.post("/create/user", async (req, res) => {
    try{
        const userEmail = req.body.email;

        const userQuery = await User.findOne({email: userEmail});
    
        if(userQuery){
            return res.status(400).send({});
        }
        else{
            const newUser = new User(req.body);
            newUser.save().catch(error => console.log(error));
            return res.status(200).send(newUser);
        }
    }
    catch(error){
        handleError(error, res);
    }
})

module.exports = router;