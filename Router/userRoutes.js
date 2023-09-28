const express=require("express");
const router=express.Router();
const User=require('../model/User')
const jwt = require('jsonwebtoken'); //jwt 
const auth=require("../auth")

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
// create user
router.post("/users",async (req,res)=>{
    const userData = req.body;
  
  if (!isValidEmail(userData.EmailAddress)) {
    return res.status(400).json({ error: 'Invalid email address format' });
  }

  try {
    // Check if the email address is already in the database
    const existingUser = await User.findOne({ EmailAddress: userData.EmailAddress });
    if (existingUser) {
      return res.status(409).json({ error: 'Email address already exists' });
    }

    const user = new User(userData); 
    await user.save();

    // we are providing a token 

    const token = jwt.sign({ userId: user._id }, "my_secret", { expiresIn: '1h' });
    res.status(201).json({ user, token});
    
    
  } catch (error) {
    res.status(400).json({ error: 'Invalid data provided' });
  }

    
})

//get single user

router.get("/tasks/:id",async (req,res)=>{
    const userId = req.params.id;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId).exec();
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }

})

// get all users

router.get('/users', async (req, res) => {
    try {
      const users = await User.find().exec();
  
      if (users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


// update task
router.put('/tasks/:id',auth, async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    if (!isValidEmail(updatedUserData.EmailAddress)) {
      return res.status(400).json({ error: 'Invalid email address format' });
    }
  
    try {
      // Check if the updated email address already exists in the database
      const existingUser = await User.findOne({ EmailAddress: updatedUserData.EmailAddress, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(409).json({ error: 'Email address already exists' });
      }
  
      // Find the user by ID and update their data
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      // retun data and success true when succesfully updated
      res.status(200).json({success:"true",updatedUser:updatedUser});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.delete('/tasks/:id',auth, async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Check if the user exists before deletion
      const existingUser = await User.findById(userId).exec();
      
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user by ID
      await User.findByIdAndRemove(userId).exec();
      res.status(204).send();
       // Respond with a 204 No Content status for successful deletion
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
    
    
  });





module.exports=router;