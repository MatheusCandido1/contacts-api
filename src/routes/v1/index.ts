import { Router } from 'express';
const category = require('./category');
const contact = require('./contact');
const user = require('./user');

const router = Router();

router.use('/categories', category);
router.use('/contacts', contact);
router.use('/users', user);

module.exports = router;
