const { Schema, model, Types } = require('mongoose');

const PostSchema = Schema({
	author: { type: String, required: true },
	content: { type: String, required: true },
	parent: { type: Types.ObjectId },
});

const Post = model('Post', PostSchema);
module.exports = Post;
