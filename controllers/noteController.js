//const Note = require("../models/Note");
const noteService = require("../services/noteService");

//CREATE NOTE
const createNote = async (req, res) =>{
    try{
        // const note = new Note({
        //     title: req.body.title,
        //     content: req.body.content,
        //     user: req.user.id
        // });
        const note = await noteService.createNote(req.body, req.user.id);

        //await note.save();

        res.json(note);
    }catch(err){
        res.status(500).json({
            message : err.message
        });
    }
}

//GET ALL NOTES (ONLY FOR LOGGED IN USER)
const getNotes = async (req,res) =>{
    try{
        //const notes = await Note.find({user: req.user.id});
        const notes = await noteService.getNotes(req.user.id);

        res.json(notes);
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

const updateNote = async(req,res) =>{
    try{
        // const note = await Note.findById(req.params.id);

        // if(!note){
        //     return res.status(404).json({message : "Note not found"});
        // }

        // //Ownership check
        // if(note.user.toString() !== req.user.id){
        //     return res.status(403).json({message : "Unauthorized"});
        // }


        // const updated = await Note.findByIdAndUpdate(
        //     req.params.id,
        //     req.body,
        //     {new : true}
        // );
        const updated =  await noteService.updateNote(
            req.params.id,
            req.body,
            req.user.id
        );

        res.json(updated);
    }catch(err){
        if(err.message === "Unauthorized"){
            res.status(403).json({message : err.message});
        }

        res.status(500).json({message: err.message});
    }
}

const deleteNote = async(req,res) => {
    try{
        // const note = await Note.findById(req.params.id);

        // if(!note){
        //     res.status(404).json({message : "Note not found"});
        // }

        // //ownership check
        // if(note.user.id !== req.user.id){
        //     res.status(403).status({message : "Unauthorized"});
        // }


        // await Note.findByIdAndDelete(
        //     req.params.id
        // );
        await noteService.deleteNote(req.params.id, req.user.id);

        res.json({message : "Note deleted"});
    }catch(err){
        if(err.message === "Unauthorized"){
            req.status(403).json({message : err.message});
        }
        res.status(500).json({message : err.message});
    }

}

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
}