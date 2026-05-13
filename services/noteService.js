const Note = require("../models/Note");

const createNote = async(data, userId) => {
    const note = new Note({
        ...data,
        user: userId
    });

    return await note.save();
}

const getNotes = async (userId) => {
    return await Note.find({user: userId});
}

const updateNote = async (id, data, userId) => {
    const note = await Note.findById(id);

    if(!note){
        throw new Error("Note not found");
    }

    if(note.user.toString() !== userId){
        throw new Error("Unauthorized");
    }

    return await Note.findByIdAndUpdate(id, data, {new : true});
}

const deleteNote = async (id, userId) => {
    const note = await Note.findById(id);

    if(!note){
        throw new Error("Note not found");
    }

    if(note.user.toString() !== userId){
        throw new Error("Unauthorized");
    }

    await Note.findByIdAndDelete(id);
}

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}