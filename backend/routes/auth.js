const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = "DPkaStylehai"
const fetchuser = require('../middleware/fetchuser')
//Route1:Creating user using:POST "/api/auth/createuser" No login requires
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 5 }),
    body('email', 'enter a valid email').isEmail()],
    async (req, res) => {
        let success=false
        //return errors if exist and bad request
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }
        try {
            //check whether mail exists
            let user = await User.findOne({ email: req.body.email }).exec()
            if (user){
                // console.log(user);
                return res.status(400).json({success, error: "usermail already exists" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPassword= await bcrypt.hash(req.body.password,salt)
            //Create User
            user = await User({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            })
            user.save()
            const data = {
                user:{
                    id:user.id
                }
            }
            success = true
            const authToken=jwt.sign(data,JWT_SECRET)
            res.json({success,authToken})
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server error");
        }
        
    })

//Route2:login user using:POST "/api/auth/createuser" No login requires
router.post('/login',[
    body('email','Enter valid email').isEmail(),
    body('password','password cannot be blank').exists()
],async(req,res)=>{
    let success = false
    //return errors if exist and bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() })
    }   
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success,error:'Credentials are wrong'})
        }
        const passwordcompare = await bcrypt.compare(password,user.password)
        if(!passwordcompare){
            return res.status(400).json({success,error:'Credentials are wrong'})
        }
        const data ={
            user:{
                id:user.id
            }
            
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        success=true
        res.json({success,authToken})
    } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server error");
    }
})    

//Route3:getting user details using:get "/api/auth/getuser" login requires
router.post('/getuser',fetchuser,async(req,res)=>{
try {
    userId=req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
}catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error");
}
})
module.exports = router;
