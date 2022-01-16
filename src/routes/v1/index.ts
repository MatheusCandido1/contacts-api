import { Router } from 'express';
const category = require('./category.ts');
const contact = require('./contact.ts');
const user = require('./user.ts');

const router = Router();

router.use('/categories', category);
router.use('/contacts', contact);
router.use('/users', user);

module.exports = router;
