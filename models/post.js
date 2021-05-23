const config = require('../util/config.json');
const { Schema, model, Types } = require('mongoose');

const PostSchema = Schema({
	author: { type: String, required: true },
	content: { type: String, required: true },
	parent: { type: Types.ObjectId },
});

PostSchema.statics.isContentValid = function (content) {
	return typeof content == 'string' && content.length >= config.minPostLestn;
};

const Post = model('Post', PostSchema);
module.exports = Post;
