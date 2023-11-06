const express = require("express");

const router = express.Router();
const Note = require("../models/note");

router.post('', (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    note.save().then((createdNote) => {
        res.status(200).json({
            message: "post added succesfully",
            noteId: createdNote._id
        });
    });
});

router.get('', (req, res) => {
    Note.find().then((document) => {
        res.status(200).json({
            message: "get succesfully",
            notes: document
        })
    })
});

router.get('/:id', (req, res) => {
    Note.findById(req.params.id).then((note) => {
        console.log(note)
        if (note) {
            res.status(200).json(note)
        } else {
            res.status(404).json("note not found")
        }
    })
});

router.put('/:id', (req, res) => {
    const note = new Note({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Note.updateOne({ _id: req.params.id }, note).then(result => {
        res.status(200).json({
            message: "note updated successfully"
        })
    })
});

router.delete('/:id', (req, res) => {
    Note.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: "deleted succesfully"
        })
    })
});

module.exports = router;
