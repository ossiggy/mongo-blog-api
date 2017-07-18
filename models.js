const mongoose = require('mongoose')

const blogPostSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {
        firstName: String,
        lastName: String
    },
    created: Date
})

blogPostSchema.virtual('authorName').get(function(){
    return `${this.author.firstName} ${this.author.lastName}`.trim()
})

blogPostSchema.methods.apiRepr = function(){

    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.authorName,
        created: this.created
    }
}

const Post = mongoose.model('Post', blogPostSchema)

module.exports = {Restaurant}