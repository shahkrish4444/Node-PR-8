const { Router } = require('express');
const { create, update, getCat } = require('../Controller/Category.controller');


const catRouter = Router();

catRouter.post('/', create);
catRouter.get('/', getCat);


module.exports = catRouter;