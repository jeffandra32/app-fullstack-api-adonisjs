'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post');

const Helpers = use('Helpers');

class PostController {
  /**
   * Create
   * @param {*} { request, response, auth }
   * @returns
   * @memberof PostController
   */
  async store({ request, response, auth }) {
    const { id } = auth.user;

    const data = request.only(['content', 'session']);

    const image = request.file('image_url', {
      types: ['image'],
      size: '2mb',
    });

    if (image) {
      await image.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${image.subtype}`,
      });

      if (!image.moved()) {
        return image.error();
      }

      data.image_url = image.fileName;
    }

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
    const post = await Post.query()
      .with('user', (builder) => {
        builder.select([
          'id',
          'avatar',
          'username',
          'firstName',
          'lastName',
          'title',
          'github',
          'linkedin',
          'bio',
        ]);
      })
      .fetch();

    return post;
  }

  /**
   * getById
   * @param {*} { params, response, auth }
   * @returns
   * @memberof PostController
   */
  async show({ params, response }) {
    const post = await Post.find(params.id);

    await post.load('user', (builder) => {
      builder.select([
        'id',
        'avatar',
        'username',
        'firstName',
        'lastName',
        'title',
        'github',
        'linkedin',
        'bio',
      ]);
    });

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
