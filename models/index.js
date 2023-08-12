const User = require('./users');
const Post = require('./post');
const Comment = require('./comments');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id', 
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id', 
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };