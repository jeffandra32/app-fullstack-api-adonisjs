'use strict'

const Relationship = use('App/Models/Relationship');

/**
 * Resourceful controller for interacting with relationships
 */
class RelationshipController {
  /**
   * Show a list of all relationships.
   * GET relationships
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }


  /**
   * Create/save a new relationship.
   * POST relationships
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { id } = auth.user;

    const data = request.only(['relationship', 'friends_id']);

    const relationship = await Relationship.create({ ...data, user_id: id });

    return response.status(201).json(relationship);
  }

  /**
   * Display a single relationship.
   * GET relationships/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing relationship.
   * GET relationships/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Delete a relationship with id.
   * DELETE relationships/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RelationshipController
