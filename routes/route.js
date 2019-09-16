const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

//getting contacts
router.get('/contacts',(req,res,next)=>{
    Contact.find((err,contacts)=>{
        res.json(contacts);
    });
});

//add contacts
router.post('/contacts',(req,res,next)=>{
   
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save((err,contact)=>{
        if(err){
            res.json({msg:'Failed to add contact'});
        }else{
            res.json({msg:'Contact added successfully'});
        }
    })
});

//delete contact
router.delete('/contacts/:id',(req,res,next)=>{
    Contact.deleteOne({_id: req.params.id}, (err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
})

//update contact



module.exports = router;