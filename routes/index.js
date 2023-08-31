const express = require('express');
const postRequestHandeler = require('../controllers/mainController')

const router = express.Router();



router.post('/',postRequestHandeler.postRequestFromServer);
router.get('/',postRequestHandeler.getRequestFromServer);



module.exports= router;