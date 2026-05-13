const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  signup,
  login,
  getUser,
  getUserByName,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");


router.post("/signup", signup);
router.post("/login", login);
router.get("/user", getUser);
router.get("/user/:name", getUserByName);
router.post("/user", createUser);
router.put("/user/:name", updateUser);
router.delete("/user/:name", deleteUser);
router.get("/profile",auth, (req,res)=>{
  res.json({
    message : "Protected route accessed",
    user : req.user
  });
});

module.exports = router;