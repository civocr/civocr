# pxf-user-component-example
 

# AuthenticationModule Class Documentation


`AuthenticationModule` is a reusable class designed to facilitate common authentication tasks such as registering new users, logging in, and updating user details. It is designed to be model-agnostic, allowing it to work with any Mongoose model by passing the model as a parameter to the class constructor.

## Constructor

### Syntax

```javascript
const authModule = new AuthenticationModule(Model);
```

### Parameters

- `Model`: A Mongoose model that represents the collection you wish to perform authentication operations on. This model must have an `email` field and a `password` field for the `login` and `register` methods to function correctly.

## Model Plugin

The passwordHashingPlugin offered by the pxf-user-module establishes a standardized approach for securely storing and validating passwords across various models and projects. By leveraging the bcrypt algorithm, this plugin ensures that passwords are safely hashed prior to their storage in a MongoDB database through Mongoose. 

It streamlines the process of password management by automatically handling the complexity of hashing operations and offering a straightforward method for comparing submitted passwords against stored hashes. This consistency in password handling enhances security practices and simplifies authentication workflows across different application contexts.

```javascript
var { passwordHashingPlugin } = require('pxf-user-module').plugins

// Apply the password hashing plugin with a custom salt work factor.
schema.plugin(passwordHashingPlugin, { saltWorkFactor: 10 });
```
## Methods

### login(email, password)

Authenticates a user based on their email and password.

#### Parameters

## Overview
- `email`: The user's email address.
- `password`: The user's password.

#### Returns

- A promise that resolves with the user object if authentication is successful.

#### Throws

- An error if the user cannot be found or if the password is incorrect.

### register(userData)

Registers a new user with the provided user data.

#### Parameters

- `userData`: An object containing the new user's data, including at least an `email` and a `password`, along with any other fields your model requires.

#### Returns

- A promise that resolves with the newly created user object.

#### Throws

- An error if a user with the given email already exists.

### update_details(userId, updates)

Updates the details of an existing user.

#### Parameters

- `userId`: The ID of the user to update.
- `updates`: An object containing the fields to update.

#### Returns

- A promise that resolves with the updated user object.

#### Throws

- An error if the update operation fails.

## Example Usage

```javascript
const mongoose = require('mongoose');
const User = require('./models/User');
const { AuthenticationModule } = require('pxf-user-module')

// Connect to MongoDB
mongoose.connect('mongodb://localhost/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Instantiate the module with the User model
const auth = new AuthenticationModule(User);

// Register a new user
auth.register({
  email: 'jane.doe@example.com',
  password: 'password123',
  // other fields as needed
}).then(user => {
  console.log('Registered user:', user);
}).catch(err => {
  console.error('Registration error:', err);
});

// Authenticate a user
auth.login('jane.doe@example.com', 'password123').then(user => {
  console.log('Logged in user:', user);
}).catch(err => {
  console.error('Login error:', err);
});
```

## Note

This module assumes the Mongoose model provided to it includes a method for password comparison (`bcrypt.compare`) and follows the conventions of having `email` and `password` fields. Ensure any model used with this module adheres to these requirements or adjust the module accordingly to fit your model's schema.

---

This documentation provides a clear overview of how to integrate and utilize the `AuthenticationModule` in your Node.js applications with Mongoose models.