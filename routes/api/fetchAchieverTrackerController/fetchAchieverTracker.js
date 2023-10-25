const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;
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


router.get("/get/ACT/superscore/:user_id", async (req, res) => {
    try{
        const userID = req.params.user_id;
        const tests = await ACT.find({user_id: userID});

        var englishMax = 0;
        var mathMax = 0;
        var readingMax = 0;
        var scienceMax = 0;

        for(var i = 0; i < tests.length; i++){
            const currTest = tests[i];
            if(currTest.english > englishMax){
                englishMax = currTest.english;
            }
            if(currTest.math > mathMax){
                mathMax = currTest.math;
            }
            if(currTest.reading > readingMax){
                readingMax = currTest.reading;
            }
            if(currTest.science > scienceMax){
                scienceMax = currTest.science;
            }
        }
        var composite = Math.ceil((englishMax + mathMax + readingMax + scienceMax)/4);
        var STEM = Math.ceil((mathMax + scienceMax)/2);

        const superscoreJSON = 
            {
                "english": englishMax, 
                "math": mathMax,
                "reading": readingMax,
                "science": scienceMax,
                "STEM": STEM,
                "composite": composite
            };

        return res.status(200).send(encryptData(JSON.stringify(superscoreJSON)));
    }
    catch(error){
        handleError(error, res);
    }
    
})

router.get("/get/SAT/superscore/:user_id", async (req, res) => {
    try{
        const userID = req.params.user_id;
        const tests = await SAT.find({user_id: userID});

        var englishMax = 0;
        var mathMax = 0;

        for(var i = 0; i < tests.length; i++){
            const currTest = tests[i];
            if(currTest.english > englishMax){
                englishMax = currTest.english;
            }
            if(currTest.math > mathMax){
                mathMax = currTest.math;
            }
        }

        const totalMax = englishMax + mathMax;
        const superscoreJSON = 
            {
                "english": englishMax, 
                "math": mathMax,
                "total_score": totalMax
            };

        return res.status(200).send(encryptData(JSON.stringify(superscoreJSON)));
    }
    catch(error){
        handleError(error, res);
    }

})

router.get("/fetch/user/profile/:user_id", async (req, res) => {
    try{
        const userID = req.params.user_id;
        const user = await User.find({_id: userID});
        const userName = user.name;
        const actTests = await ACT.find({user_id: userID});
        const satTests = await SAT.find({user_id: userID});
        const APIB_Tests = await Student_APIB_Test.find({user_id: userID});
        const awards = await Award.find({user_id: userID});
        const colleges = await College.find({user_id: userID});
        const studentECs = await Student_extracurricular.find({user_id: userID});

        console.log(userName);

        const userProfile = 
            {
                "Name": userName,
                "ACTs": actTests,
                "SATs": satTests,
                "APs and IBs": APIB_Tests,
                "Awards": awards,
                "College Results": colleges,
                "Extracurriculars": studentECs
            };

        return res.status(200).send(userProfile);
        // return res.status(200).send(encryptData(JSON.stringify(userProfile)));
    }
    catch(error){
        handleError(error, res);
    }

})

router.get("/fetch/activites/by/fields/:field", async (req, res) => {
    try{
        const queryField = req.params.field;

        const activities = await Extracurricular.find({
            relevant_fields: {$in : [queryField]}
        })
        return res.status(200).json(encryptData(JSON.stringify(activities)));
    }
    catch(error){
        handleError(error, res);
    }
    
})

router.get("/fetch/APIB_tests/by/fields/:field", async (req, res) => {
    try{
        const queryField = req.params.field;

        const activities = await Student_APIB_Test.find({relevant_fields: {$in: [queryField]}});
        return res.status(200).json(encryptData(JSON.stringify(activities)));
    }
    catch(error){
        handleError(error, res);
    }
})

router.get("/fetch/college/application/by/major/:college/:major", async (req, res) => {
    try{
        const collegeName = req.params.college;
        const applicationMajor = req.params.major;

        const applications = await College.find({$and: [{name: collegeName}, {major_applied: applicationMajor}]});
        return res.status(200).json(encryptData(JSON.stringify(applications)));
    }
    catch(error){
        handleError(error, res);
    }
})

router.get("/fetch/top/five/liked/extracurriculars", async (req, res) => {
    try{
        // const filter = {
        //     projection: {name : 1, description : 1, relevant_fields: 1, likes: 1},
        //     sort: {likes : 1},
        //     limit: 5
        // }

        const topFiveExtracurriculars = await Extracurricular.find().sort({likes: -1}).limit(6);

        // console.log(JSON.stringify(topFiveExtracurriculars));
        if (topFiveExtracurriculars.length === 0) {
            return res.status(404).json({message: "There are no extracurriculars found at the moment"})
        }
        const response = {};

        response.extracurricularTopFiveList = topFiveExtracurriculars;

        console.log(response); 

        return res.status(200).json(encryptData(JSON.stringify(response)));

    }
    catch(error){
        handleError(error, res);
    }
})

router.get("/fetch/top/five/common/extracurriculars", async (req, res) => {
    try {
      var extracurriculars = {};
      const users = await User.find();
  
      for (var i = 0; i < users.length; i++) {
        const currentUser = users[i];
        const userID = currentUser._id;
        const currentUserExtracurriculars = await Student_extracurricular.find({user_id: String(userID)});
  
        for (var j = 0; j < currentUserExtracurriculars.length; j++) {
          const currentEC = currentUserExtracurriculars[j];
          if (extracurriculars[currentEC.extracurricular_id] === undefined) {
            extracurriculars[currentEC.extracurricular_id] = 1;
          } else {
            extracurriculars[currentEC.extracurricular_id] += 1;
          }
        }
      }
  
      const listOfKeys = Object.keys(extracurriculars);
      listOfKeys.sort((a, b) => extracurriculars[b] - extracurriculars[a]);
  
      
      const topFiveActivitiesStrings = listOfKeys.slice(0, 6);
  
      
      const topFiveActivities = topFiveActivitiesStrings.map(id => new ObjectID(id));

      const topFiveQuery = { _id: { $in: topFiveActivities } };
      let topFiveActivityDocuments = await Extracurricular.find(topFiveQuery).lean();
  
    
      topFiveActivityDocuments.sort((a, b) => {
        return topFiveActivitiesStrings.indexOf(a._id.toString()) - topFiveActivitiesStrings.indexOf(b._id.toString());
      });
  
      return res.status(200).json(encryptData(JSON.stringify(topFiveActivityDocuments)));

    } catch (error) {
      handleError(error, res);
    }
  });

router.get("/fetch/top/five/accepted/colleges", async (req, res) => {
    try{
        const colleges = await College_Application.find();
        var acceptedCount = {};
        for(var i = 0; i < colleges.length; i++){
            const currentCollege = colleges[i];
            if(currentCollege.application_result === "Accepted"){
                if(acceptedCount[currentCollege.college_id] === undefined){
                    acceptedCount[currentCollege.college_id] = 1;
                }
                else{
                    acceptedCount[currentCollege.college_id] = acceptedCount[currentCollege.college_id] + 1;
                }
            }
        }

        const listOfKeys = Object.keys(acceptedCount);
        listOfKeys.sort((a, b) => acceptedCount[b] - acceptedCount[a]);

        const topFiveCollegesStrings = listOfKeys.slice(0, 6);

        const topFiveColleges = topFiveCollegesStrings.map(id => new ObjectID(id));

        const topFiveQuery = { _id: { $in: topFiveColleges } };

        let topFiveCollegeDocuments = await College.find(topFiveQuery).lean();

        topFiveCollegeDocuments.sort((a, b) => {
            return topFiveCollegesStrings.indexOf(a._id.toString()) - topFiveCollegesStrings.indexOf(b._id.toString());
          });

        return res.status(200).json(encryptData(JSON.stringify(topFiveCollegeDocuments)));
    }
    catch(error){
        handleError(error, res);
    }
})

module.exports = router;