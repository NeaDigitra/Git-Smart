// Sample git diffs for testing
const sampleDiffs = {
  // Feature addition with new authentication module
  authFeature: `diff --git a/src/auth/index.js b/src/auth/index.js
new file mode 100644
index 0000000..1234567
--- /dev/null
+++ b/src/auth/index.js
@@ -0,0 +1,25 @@
+const bcrypt = require('bcrypt')
+const jwt = require('jsonwebtoken')
+
+class AuthService {
+  constructor(secretKey) {
+    this.secretKey = secretKey
+  }
+
+  async hashPassword(password) {
+    return await bcrypt.hash(password, 10)
+  }
+
+  async verifyPassword(password, hashedPassword) {
+    return await bcrypt.compare(password, hashedPassword)
+  }
+
+  generateToken(payload) {
+    return jwt.sign(payload, this.secretKey, { expiresIn: '24h' })
+  }
+
+  verifyToken(token) {
+    return jwt.verify(token, this.secretKey)
+  }
+}
+
+module.exports = { AuthService }`,

  // Bug fix in existing API
  apiBugFix: `diff --git a/src/api/users.js b/src/api/users.js
index abcdef1..1234567 100644
--- a/src/api/users.js
+++ b/src/api/users.js
@@ -10,7 +10,10 @@ async function getUser(id) {
   }
   
   const response = await fetch(\`/api/users/\${id}\`)
-  return response.json()
+  if (!response.ok) {
+    throw new Error(\`Failed to fetch user: \${response.status}\`)
+  }
+  return await response.json()
 }
 
 async function createUser(userData) {
@@ -18,6 +21,9 @@ async function createUser(userData) {
     throw new Error('User data is required')
   }
   
+  if (!userData.email || !userData.password) {
+    throw new Error('Email and password are required')
+  }
+  
   const response = await fetch('/api/users', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },`,

  // Test file addition
  testAddition: `diff --git a/tests/auth.test.js b/tests/auth.test.js
new file mode 100644
index 0000000..1234567
--- /dev/null
+++ b/tests/auth.test.js
@@ -0,0 +1,30 @@
+const { AuthService } = require('../src/auth')
+
+describe('AuthService', () => {
+  let authService
+  
+  beforeEach(() => {
+    authService = new AuthService('test-secret')
+  })
+  
+  describe('hashPassword', () => {
+    test('should hash password correctly', async () => {
+      const password = 'testpassword123'
+      const hashed = await authService.hashPassword(password)
+      
+      expect(hashed).toBeTruthy()
+      expect(hashed).not.toBe(password)
+    })
+  })
+  
+  describe('verifyPassword', () => {
+    test('should verify correct password', async () => {
+      const password = 'testpassword123'
+      const hashed = await authService.hashPassword(password)
+      const isValid = await authService.verifyPassword(password, hashed)
+      
+      expect(isValid).toBe(true)
+    })
+  })
+})`,

  // Documentation update
  docsUpdate: `diff --git a/README.md b/README.md
index abcdef1..1234567 100644
--- a/README.md
+++ b/README.md
@@ -1,6 +1,8 @@
 # My Awesome Project
 
-A simple web application.
+A comprehensive web application with user authentication and real-time features.
+
+## Features
 
 ## Installation
 
@@ -10,6 +12,18 @@ npm install
 npm start
 \`\`\`
 
+## Authentication
+
+The application includes a complete authentication system:
+
+- User registration and login
+- Password hashing with bcrypt
+- JWT token-based authentication
+- Protected routes and middleware
+
+## API Documentation
+
+See [API.md](./docs/API.md) for detailed API documentation.
+
 ## License
 
 MIT`,

  // Style/CSS changes
  styleChanges: `diff --git a/src/styles/components.css b/src/styles/components.css
index abcdef1..1234567 100644
--- a/src/styles/components.css
+++ b/src/styles/components.css
@@ -1,10 +1,15 @@
 .button {
   padding: 8px 16px;
-  background-color: #007bff;
+  background-color: var(--primary-color);
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
+  transition: all 0.2s ease;
+}
+
+.button:hover {
+  background-color: var(--primary-hover-color);
 }
 
 .button:disabled {
@@ -15,4 +20,9 @@
 .input {
   padding: 8px 12px;
   border: 1px solid #ddd;
+  border-radius: 4px;
+}
+
+.input:focus {
+  outline: none;
+  border-color: var(--primary-color);
 }`,

  // Configuration changes
  configChanges: `diff --git a/package.json b/package.json
index abcdef1..1234567 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
   "name": "my-project",
-  "version": "1.0.0",
+  "version": "1.1.0",
   "description": "A sample project",
   "main": "index.js",
   "scripts": {
@@ -11,7 +11,9 @@
   },
   "dependencies": {
     "express": "^4.18.0",
-    "nodemon": "^2.0.0"
+    "nodemon": "^2.0.0",
+    "bcrypt": "^5.1.0",
+    "jsonwebtoken": "^9.0.0"
   },
   "devDependencies": {
     "jest": "^29.0.0"
diff --git a/webpack.config.js b/webpack.config.js
index abcdef1..1234567 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -8,6 +8,9 @@ module.exports = {
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'bundle.js',
+    clean: true,
+    publicPath: '/',
+    assetModuleFilename: 'assets/[hash][ext][query]'
   },
   module: {
     rules: [`,

  // Refactoring changes
  refactorChanges: `diff --git a/src/utils/helpers.js b/src/utils/validation.js
similarity index 75%
rename from src/utils/helpers.js
rename to src/utils/validation.js
index abcdef1..1234567 100644
--- a/src/utils/helpers.js
+++ b/src/utils/validation.js
@@ -1,6 +1,6 @@
-// Helper functions
+// Validation utilities
 
-function validateEmail(email) {
+function isValidEmail(email) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   return emailRegex.test(email)
 }
@@ -10,7 +10,11 @@ function validatePassword(password) {
   return password.length >= 8
 }
 
-module.exports = {
-  validateEmail,
-  validatePassword
+function isValidPhoneNumber(phone) {
+  const phoneRegex = /^\+?[\d\s\-\(\)]+$/
+  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
 }
+
+module.exports = {
+  isValidEmail,
+  validatePassword,
+  isValidPhoneNumber
+}`,

  // Performance optimization
  perfOptimization: `diff --git a/src/components/UserList.jsx b/src/components/UserList.jsx
index abcdef1..1234567 100644
--- a/src/components/UserList.jsx
+++ b/src/components/UserList.jsx
@@ -1,4 +1,4 @@
-import React, { useState, useEffect } from 'react'
+import React, { useState, useEffect, useMemo, useCallback } from 'react'
 import { fetchUsers } from '../api/users'
 
 function UserList() {
@@ -6,12 +6,20 @@ function UserList() {
   const [loading, setLoading] = useState(true)
   const [searchTerm, setSearchTerm] = useState('')
 
+  const filteredUsers = useMemo(() => {
+    return users.filter(user => 
+      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
+      user.email.toLowerCase().includes(searchTerm.toLowerCase())
+    )
+  }, [users, searchTerm])
+
+  const handleSearch = useCallback((event) => {
+    setSearchTerm(event.target.value)
+  }, [])
+
   useEffect(() => {
     async function loadUsers() {
       try {
-        setLoading(true)
         const userData = await fetchUsers()
         setUsers(userData)
       } catch (error) {
@@ -24,15 +32,7 @@ function UserList() {
     loadUsers()
   }, [])
 
-  const filteredUsers = users.filter(user => 
-    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
-    user.email.toLowerCase().includes(searchTerm.toLowerCase())
-  )
-
-  const handleSearch = (event) => {
-    setSearchTerm(event.target.value)
-  }
-
   if (loading) {
     return <div>Loading users...</div>
   }`
}

module.exports = { sampleDiffs }