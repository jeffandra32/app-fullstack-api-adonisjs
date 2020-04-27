'use strict'

class Post {
  get rules () {
    return {
      content: 'required',
      session: 'required|in:1,2,3,4',
      user_id: ''
    }
  }
}

module.exports = Post
