'use strict'
const User = use('App/Models/User');

class RegisterController {
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
}

module.exports = RegisterController
