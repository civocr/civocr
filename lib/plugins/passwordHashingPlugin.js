// passwordHashingPlugin.js
const bcrypt = require('bcryptjs');

module.exports = function passwordHashingPlugin(schema, options) {
    schema.virtual('password').set(function (password) {
        this._password = password;
        const salt = bcrypt.genSaltSync(options.saltWorkFactor || 10);
        this.passwordHash = bcrypt.hashSync(password, salt);
    }).get(function () {
        return this._password;
    });

    schema.methods.comparePassword = function (candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.passwordHash, (err, isMatch) => {
            if (err) return callback(err);
            callback(null, isMatch);
        });
    };

    // If you prefer async/await over callbacks:
    schema.methods.comparePasswordAsync = async function (candidatePassword) {
        console.log(candidatePassword, this.passwordHash)
        return await bcrypt.compare(candidatePassword, this.passwordHash);
    };
};
