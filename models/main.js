const Sequelize = require('sequelize');

const sequelize = new Sequelize('socialmediadb','root','10031998mysql@',{
    host: 'localhost',
    dialect: 'mysql'
});


const Post =  sequelize.define('posts_data',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true // Add auto--increment option
    },
    postLink: Sequelize.STRING,
    postDescription: Sequelize.STRING,
},{timestamps:false});


module.exports = Post;