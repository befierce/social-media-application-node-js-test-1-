const { Post, Comment } = require('../models/main');



exports.postRequestFromClientToServer = (req, res) => {
    const { postLink, postDescription } = req.body;
    const imagePath = req.body.postLink;
    
    Post.create({ postLink, postDescription })
    .then((result) => {
        // res.json({ imagePath: imagePath });
        const postId = result.dataValues.id;
        res.json({ postId, imagePath })
        // console.log(result.dataValues.id);
    });
}

exports.postCommentToServer = (req, res) => {
    const postId = req.params.postId;
    const { commentText } = req.body;
    console.log(req)
    Comment.create({
        postId: postId,
        commentText: commentText
    })
    .then(() => {
        res.json({ message: 'Comment added successfully' });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error submitting comment' });
    });
}


exports.getRequestFromClienttoServer = (req, res) => {
    Post.findAll({
        include: Comment // Assuming you've defined the Comment model and established associations
    })
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {   
        console.log(err);
        res.status(500).json({ error: 'Error retrieving data' });
    });
}
