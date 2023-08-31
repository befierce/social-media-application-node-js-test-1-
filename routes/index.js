const express = require('express');
const postRequestHandeler = require('../controllers/mainController')

const router = express.Router();


router.post('/comment/:postId',postRequestHandeler.postCommentToServer);
router.post('/',postRequestHandeler.postRequestFromClientToServer);
router.get('/',postRequestHandeler.getRequestFromClienttoServer);



module.exports= router;