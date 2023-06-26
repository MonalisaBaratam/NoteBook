const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator')
//Route1:get all notes of user login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.send({ notes })
})

//Route2:add notes login required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 5 }),
    body('description', 'enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if error exist send error
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.send({ savedNote })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server error");
    }
})

//Route3:update note login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create new note object
    try {
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server error");
    }
})
//Route4:delete note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send({ "success": "sucessfully deleted", note: note })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server error");
    }
})
module.exports = router;
