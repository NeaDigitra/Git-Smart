// Example authentication module
class UserAuth {
  constructor() {
    this.users = new Map()
  }

  async authenticateUser(email, password) {
    const user = this.users.get(email)
    if (!user) {
      throw new Error('User not found')
    }
    
    return this.validatePassword(password, user.hashedPassword)
  }

  validatePassword(plainPassword, hashedPassword) {
    // Simple validation for demo
    return plainPassword === hashedPassword
  }

  createUser(email, password) {
    this.users.set(email, {
      email,
      hashedPassword: password,
      createdAt: new Date()
    })
  }
}

module.exports = { UserAuth }