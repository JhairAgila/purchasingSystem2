const User = require("../models/User");
const { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");


//UODATE
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET
            ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate( 
            req.params.id, {
                $set: req.body,
            }, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json("Error");
    }
});

//DELETE
router.delete("/:id", verifyTokenAuthorization, async(req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    }catch(error){
        res.status(500).json(error);
    }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(error){
        res.status(500).json(error);
    }
});
//GET USER WITH PASSWORD UNCODED
router.get("/findUser/:id", verifyTokenAndAdmin, async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
        // const hashedPassword = CryptoJS.AES.decrypt(
        //     user.password,
        //     process.env.PASSWORD_SECRET);
        // const passwordCaptured = hashedPassword.toString(CryptoJS.enc.Utf8);
        // const userCompleted = {...user, password : passwordCaptured};
        // res.status(200).json(passwordCaptured);
    }catch(error){
        res.status(500).json(error);
    }
});
//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    const query = req.query.new;
    try{
        const users =   query ? await User.find().sort({_id: -1}).limit(5) : await User.find();

        res.status(200).json(users);
    }catch(error){
        res.status(500).json(error);
    }
});

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte : lastYear }}},
            {
                $project: {
                    month: {$month : "$createdAt"}
                }
            },
            {$group : {
                _id: "$month",
                total: { $sum: 1 } 
            }}

        ]);
        res.status(200).json(data);
    }catch(error){
        res.status(500).json(error);
    }
});
module.exports = router; 
