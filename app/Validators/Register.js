'use strict'

class Register {
  get rules () {
    return {
      email: 'email|required',
      username: 'required',
      password: 'required',
      confirmPassword: 'required',
      firstName: 'required',
      lastName: 'required',
    }
  }
}

module.exports = Register
