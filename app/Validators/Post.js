'use strict'

class Post {
  get rules () {
    return {
      title: 'required',
      description: 'required',
      section: 'required|in:1,2,3,4',
      user_id: ''
    }
  }
}

module.exports = Post
