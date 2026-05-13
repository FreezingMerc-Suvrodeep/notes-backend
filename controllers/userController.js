//USER SIGNUP
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signupSchema } = require("../validators/userValidator");

const signup = async (req, res, next) => {
    try{
        const { error } = signupSchema.validate(req.body);

        if(error){
            return res.status(400).json({
                message : error.details[0].message
            });
        }
        const {email, name, password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.json({message : "User already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password : hashedPassword
        });

        await user.save();

        res.json({
            message : "User created successfully!"
        });


    }catch(err){
        next(err);
    }
}

//USER LOGIN
const jwt = require("jsonwebtoken");

const login = async (req,res, next) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.json({message: "User not found"});
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({message : "Invalid password"});
        }

        //create token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        );

        res.json({
            message : "Login successful!",
            token : token
        });
    } catch(err){
        next(err);
    }
}

//GET ALL USERS
const getUser = async (req,res,next) => {
    try {
        const user = await User.find();

        res.json(user);
    }catch(err){
        next(err);
    }
}

//GET SINGLE USER
const getUserByName = async (req,res) =>{
    const name = req.params.name;
    try{
    const user = await User.find(u => u.name === name);

    if(!user){
        res.json({
            message : "User Not found",
            statusCode : 404
        })
    }

    res.json(user);
}catch(err){
    next(err);
}
}

//CREATE USER
const createUser = (req,res) => {
    const user = req.body;
    users.push(user);
    console.log(user);

    res.json({
        message: "User created successfully!",
        user : user,
        statusCode : 200
    })
}

//UPDATE USER
const updateUser = (req,res) => {
    const name = req.params.name;
    const user = users.find(u => u.name === name);

    if(!user){
        return res.status(400).json({message : "User not found"});
    }

    Object.assign(user, req.body);

    res.json({
        message : "User updated",
        user : user
    })
}

//DELETE USER
const deleteUser = (req,res) => {
    const name =req.params.name;

    users = users.filter(u => u.name!==name);
    
    res.json({
        message: `User ${name} deleted`,
        users
    })
}

module.exports = {
    signup,
    login,
    getUser,
    getUserByName,
    createUser,
    updateUser,
    deleteUser
}