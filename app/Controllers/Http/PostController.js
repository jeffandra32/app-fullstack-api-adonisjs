'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post');

class PostController {
  /**
   * Create
   * @param {*} { request, response, auth }
   * @returns
   * @memberof PostController
   */
  async store({ request, response, auth }) {
    const { id } = auth.user;

    const data = request.only(['title', 'description', 'session']);

    const post = Post.create({ ...data, user_id: id });

    return response.status(201).json(post);
  }

  /**
   * getAll
   * @param {*} { auth }
   * @returns
   * @memberof PostController
   */
  async index() {
    const post = Post.query().with('user').fetch();

    return post;
  }

  /**
   * getById
   * @param {*} { params, response, auth }
   * @returns
   * @memberof PostController
   */
  async show({ params, response }) {
    const post = await Post.query().where('id', params.id).first();

    if (!post) {
      return response
        .status(404)
        .send({ message: 'Nenhum registro encontrado.' });
    }

    return post;
  }

  /**
   * Update Post
   * @param {*} { request, params, response, auth }
   * @returns
   * @memberof PostController
   */
  async update({ request, params, response, auth }) {
    const { title, description, session } = request.all();

    const post = await Post.query()
      .where('id', params.id)
      .where('user_id', '=', auth.user.id)
      .first();

    if (!post) {
      return response
        .status(404)
        .send({ message: 'Nenhum registro encontrado.' });
    }

    post.title = title;
    post.description = description;
    post.session = session;
    post.id = params.id;

    await post.save();

    return post;
  }

  async destroy({ params, response, auth }) {
    const post = await Post.query()
      .where('id', params.id)
      .where('user_id', '=', auth.user.id)
      .first();

    if (!post) {
      return response
        .status(404)
        .send({ message: 'Nenhum registro encontrado.' });
    }

    await post.delete();

    return response
      .status(200)
      .send({ message: 'Registro removido com sucesso.' });
  }
}

module.exports = PostController;
