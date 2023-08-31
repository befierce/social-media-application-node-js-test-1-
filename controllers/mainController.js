const Post = require('../models/main')


exports.postRequestFromServer = (req, res) => {
    const { postLink, postDescription } = req.body;
    const imagePath = req.body.postLink;
    Post.create({ postLink, postDescription })
    .then(() => {
        res.json({ imagePath: imagePath });
    });
}

exports.getRequestFromServer = (req,res) =>{
    Post.findAll()
    .then((result)=>{
        console.log(result);
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error retrieving data' });
    });
}