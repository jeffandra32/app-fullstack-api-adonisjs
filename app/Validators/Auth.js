'use strict'

class Auth {
  get rules () {
    return {
      email: 'email|required',
      password: 'password|required',
      username: 'username|required',
      confirmPassword: 'confirmPassword|required',
      firstName: 'firstName|required',
      lastName: 'lastName|required',
    }
  }
}

module.exports = Auth
