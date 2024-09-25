const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser")
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');
const { findByIdAndUpdate } = require('../models/User');


///fetch all notes available////////////////////////////require login/token/////////////////////////////////////

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ usr: req.user.id });    //user has been appended to req in middleware
        res.json(notes);
    } catch (err) {
        res.status(500).send("server error" + err.errmsg);      //error in try block
    }
})

///add a new note////////////////////////////require login/token////////////////////////////////////////////////

router.post('/addnote', fetchUser, [
    body('title', 'enter valid entry').notEmpty(),
    body('desc', 'enter valid entry').notEmpty()
], async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }
    // console.log(req.user.id)
    try {
        const { title, desc, tag } = req.body;
        const newNote = Notes({
            title: title,
            desc: desc,
            tag: tag,
            usr: req.user.id
        })
        const savedNote = await newNote.save();
        // console.log(savedNote.usr);
        res.json(savedNote);
    } catch (err) {
        res.status(500).send("server error" + err.errmsg);      //error in try block
    }
})

///update a note////////////////////////////require login/token////////////////////////////////////////////////

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, desc, tag } = req.body;
    try {
        //create new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (desc) { newNote.desc = desc };
        if (tag) { newNote.tag = tag };

        //check if note exist in database
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(401).send("Note not found") };

        //check if user is authorised to update     **********note.id and note._id***************
        if (note.usr._id.toString() !== req.user.id) {
            return res.status(401).send("not allowed to update!");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }
    catch (err) {
        res.status(500).send("server error" + err.errmsg);      //error in try block
    }
})

///delete a note////////////////////////////require login/token////////////////////////////////////////////////

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //check if note exist in database
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(401).send("Note not found") };

        //check if user is authorised to delete     **********note.id and note._id***************
        if (note.usr._id.toString() !== req.user.id) {
            return res.status(401).send("not allowed to delete!");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted successfully");
    } catch (err) {
        res.status(500).send("server error" + err.errmsg);      //error in try block
    }
})

module.exports = router;