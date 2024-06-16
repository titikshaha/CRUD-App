const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

router.get("/", (req, res) => {
    console.log("connect");
    res.send("Server is up and running!");
});

router.post("/register", async (req, res) => {
    const { account, name, email, department, contact } = req.body;

    // Proper field validation
    if (!account || !name || !email || !department || !contact) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const preuser = await users.findOne({ email: email });
        console.log(preuser)

        if (preuser) {
            return res.status(409).json({ message: "User account already exists" });
        }

        const adduser = new users({
            account, name, email, department, contact
        });

        await adduser.save();
        res.status(201).json(adduser);
        console.log(adduser);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})


// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;
