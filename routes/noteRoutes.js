const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

console.log("Note routes loaded");

const {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

router.post("/notes", auth, createNote);
router.get("/notes", auth, getNotes);
router.put("/notes/:id", auth, updateNote);
router.delete("/notes/:id", auth, deleteNote);

module.exports = router;