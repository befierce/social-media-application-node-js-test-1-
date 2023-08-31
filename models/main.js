const Sequelize = require('sequelize');
const sequelize = new Sequelize('socialmediadb', 'root', '10031998mysql@', {
    host: 'localhost',
    dialect: 'mysql'
});

const Post = sequelize.define('posts_data', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    postLink: Sequelize.STRING,
    postDescription: Sequelize.STRING
}, { timestamps: false });

const Comment = sequelize.define('comments', {
    id: {   
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    commentText: Sequelize.STRING
},{ timestamps: false });

// Establish associations
Post.hasMany(Comment, { foreignKey: 'postId' }); // Assuming 'postId' is the foreign key in Comment model
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = {
    Post,
    Comment,
};
