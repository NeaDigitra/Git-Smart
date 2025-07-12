const { UserAuth } = require('./example-demo')

// Test suite for authentication
describe('UserAuth', () => {
  let auth

  beforeEach(() => {
    auth = new UserAuth()
  })

  test('should create new user', () => {
    auth.createUser('test@example.com', 'password123')
    expect(auth.users.size).toBe(1)
  })

  test('should authenticate valid user', async () => {
    auth.createUser('user@test.com', 'secret')
    const result = await auth.authenticateUser('user@test.com', 'secret')
    expect(result).toBe(true)
  })

  test('should reject invalid credentials', async () => {
    auth.createUser('user@test.com', 'secret')
    await expect(auth.authenticateUser('user@test.com', 'wrong')).rejects.toThrow()
  })
})