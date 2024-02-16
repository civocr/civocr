const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

class AuthenticationModule {
    constructor(Model) {
        this.Model = Model;
    }

    async login(email, password) {
        const user = await this.Model.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return user; // Simplified return for demonstration
    }

    async register(userData) {
        const { email } = userData;
        const existingUser = await this.Model.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = new this.Model(userData);
        await newUser.save();
        return newUser;
    }

    async update_details(userId, updates) {
        const updatedUser = await this.Model.findByIdAndUpdate(userId, updates, { new: true });
        return updatedUser;
    }
}

module.exports = AuthenticationModule;
