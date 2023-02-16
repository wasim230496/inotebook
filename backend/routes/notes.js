const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// Route 1: Get user all notes using : GET "/api/auth/fetchallnotes", login requires 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server occure')
    }
})
// Route 2: Add user notes using : post "/api/auth/addnote", login requires 
router.post('/addnote', fetchuser, [

    body('title', 'name at least 3 character').isLength({ min: 3 }),
    body('description', ' description at least 3 character').isLength({ min: 3 }),

    body('tag', 'passsword must be greater than 5 character').isLength({ min: 5 }),
], async (req, res) => {
try {
    
    const {title,description,tag} = req.body;
    //validation checking for saving note
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //creating a new note from Notes schema (here by user:req.user.id) we can get id of the existing user
    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    //saving a new notes in db with auth token
    const saveNote = await note.save()
    res.json(saveNote)
} catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server occure')
}
})
// Route 3: Update existing user notes using : put "/api/auth/updatenote", login requires 
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
try {
    

    const {title,description,tag} = req.body;
    //Create a newNote object
    let newNote = {}
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found") }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send('Not Allowed')
    }
note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note})
} catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server occure')
}
})
// Route 4: Delete existing  user notes using : DELETE "/api/auth/deletenote", login requires 
router.delete('/deletenote/:id',fetchuser, async(req,res)=>{
    try {
        
    
        
        
    
        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found") }
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed')
        }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted",note: note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server occure')
    }
    })


module.exports = router