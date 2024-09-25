const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');

//create an user "POST(/api/auth/createuser" /////////////////////////////////////////////////////////

router.post('/createuser', [
    body('name', 'enter valid entry').notEmpty(),
    body('email', 'enter valid entry').notEmpty(),
    body('password', 'enter valid entry').notEmpty()
], async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            //checking if user already exists or not
            let usercheck = await User.findOne({ email: req.body.email });
            if (usercheck) {
                return res.status(400).json({success, error: "user already exists" })
            }

            //hashing
            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(req.body.password, salt);

            //creating new user and saving to database

            let newUser = User({
                name: req.body.name,
                email: req.body.email,
                password: hashPass
            });
            await newUser.save();
            // res.send(req.body);
            const authToken = jwt.sign({ id: newUser._id }, 'secret');
            // console.log(token);
            success=true;
            res.json({success,"authToken":authToken});
        } catch (error) {
            res.status(500).send("server error"+err.errmsg);      //error in try block
        }
    }
    else
        res.send({ errors: result.array() });       //validator error
})

//login an user "POST(/api/auth/login" ///////////////////////////////////////////////////////////////////

router.post('/login',[
    body('email', 'enter valid entry').notEmpty(),
    body('password', 'enter valid entry').notEmpty()
],async (req,res)=>{
    let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });       //validator error
    }

    // const {email,password}=req.body;
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            success=false;
            return res.status(400).json({"error" : "wrong credentials"})
        }

        const passmatch = await bcrypt.compare(req.body.password,user.password);
        if(!passmatch){
            success=false;
            return res.status(400).json({success,"error" : "wrong credentials"})
        }
        
        const data={ user:{id: user._id}}
        
        const authToken = jwt.sign(data, 'secret');
        // console.log(token);
        success=true;
        res.json({success,"authToken":authToken});
        // res.json(data);
    } catch (err) {
        res.status(500).send("server error"+err.errmsg);      //error in try block
    }
})

////////get loggedin user detail/////////////////////////////////////////////////////////////

router.post('/getuser',fetchUser,async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });       //validator error
    }
    try {
        let userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        res.status(500).send("server error"+err.errmsg);      //error in try block
    }
}
)
module.exports = router;