'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post');

class PostController {
  async store({ request, response }) {
    const data = request.only(['title', 'description', 'user_id', 'section']);

    const post = await Post.create(data);

    return response.status(201).json(post);
  }
}

module.exports = PostController;
