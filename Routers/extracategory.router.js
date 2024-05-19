const { Router } = require('express');
const { create, getExtra } = require('../Controller/extracategory.controller');



const extraCatRouter = Router();

extraCatRouter.post('/', create);
extraCatRouter.get('/', getExtra);

module.exports = extraCatRouter;