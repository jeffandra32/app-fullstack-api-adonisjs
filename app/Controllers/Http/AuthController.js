'use strict';

const User = use('App/Models/User');

class AuthController {
  async register({ request }) {
    const data = request.only([
      'username',
      'email',
      'password',
      'confirmPassword',
      'firstName',
      'lastName',
      'bio',
      'github',
      'linkedin',
    ]);

    const user = await User.create(data);

    return user;
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all();

    const { token } = await auth.attempt(email, password);
    const user = await User.query().where('email', email).fetch();

    return { token, user };
  }
}

module.exports = AuthController;
