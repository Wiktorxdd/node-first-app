
import express from 'express';
import { getContacts, getContactId, searchContact, createContact, updateContact, deleteContact } from '../controllers/contact.js';
const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContactId);
router.get('/search/contact', searchContact);
router.post('/', createContact);
router.patch('/contact/update/:id', updateContact);
router.delete('/contact/delete/:id', deleteContact);
export default router;