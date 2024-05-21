import contact from '../models/contact.js';

export const getContacts = async (req, res) => {
    try{
        contact.find()
        .then((contacts) => {
            console.log(contacts);
            res.status(200).json({contacts: contacts});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json('Error getting contacts');
        });
    } catch(error){
        console.log('Error: ', error);
        res.status(500).send({msg:"unable to get contacts"});
    }
}

export const getContactId = async (req, res) => {
    try{
        contact.findById(req.params.id)
        .then((contact) => {
            console.log(contact);
            res.status(200).json({contact: contact});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json('Error getting contact');
        });
    } catch(error){
        console.log('Error: ', error);
        res.status(500).send({msg:"unable to get contact"});
    }
}

export const searchContact = async (req, res) => {
    try{
        const searchTerm = req.query.searchTerm;
        const searchReg = new RegExp(searchTerm, 'i');
        await contact.find({
            $or: [{firstName: searchReg},
                 {lastName: searchReg}, 
                 {email: searchReg}]})
        .then((contacts) => {
            if(contacts.length){
                res.status(200).json({contacts: contacts});
            }
            else {res.status(200).json({contacts: [], msg:"no matching records found"});
        } 
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({msg:"no matching records found"});
        })

    }catch(error){
        console.log('Error: ', error);
        res.status(500).json({msg:"no matching records found"});
    }
}

export const createContact = async (req, res) => {
    try{
        const newContact = new contact(req.body);
        await newContact.save()
        .then((savedContact) =>{
            console.log(savedContact);
            res.status(201).json("Saved contract successfully");
        })
        .catch((error) =>{
            console.log(error);
            if(error.code === 11000 && error.keyPattern.email){
                res.status(500).json('Email already exists');
                return;  
            }
            else{res.status(500).json('Error saving contact');}      
        });
    }catch(error){
        console.log('Error: ', error);
        res.status(500).send('Server error');
    }
}

export const updateContact = async (req, res) => {
    try{
        const id = req.params.id;
        const updateContact = req.body;
        await contact.findOneAndUpdate({_id: id}, updateContact, {new: true})
        .then(updatedContact =>{
            console.log(updatedContact);
            res.status(200).json({msg:"contact updated successfully", contact: updatedContact});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({msg:"unable to update contact"});
        
        })

    } catch(error){
        console.log('Error: ', error);
        res.status(500).json({msg:"unable to update contact"});
    }
}

export const deleteContact = async (req, res) => {
    try{
        const id = req.params.id;
        await contact.findByIdAndDelete({_id: id})
        .then((deletedContact) => {
            console.log(deletedContact);
            res.status(200).json({msg:"contact deleted successfully", contact: deletedContact});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({msg:"unable to delete contact"});
        });
    }catch(error){
        console.log('Error: ', error);
        res.status(500).json({msg:"unable to delete contact"});
    }
}
