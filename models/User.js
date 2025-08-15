const mongoose = require("mongoose");       // defining MongoDB schema 
const bcrypt = require("bcrypt");          // library for hashing passwords

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },  // Each user must have a unique email
    password: {type: String, required: true }               // Password is required and will be hashed before saving 
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();            // if password has not changed, skip hashing
    const salt = await bcrypt.genSalt(10);                      // generate a salt (random string) with 10 rounds
    this.password = await bcrypt.hash(this.password, salt);    // hash the password with the salt 
    next();                                                     // move on to the next save step
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);   // // compares the raw password from login with the hashed password in DB
};

// helps export the model to be used in other files
module.exports = mongoose.model("User", userSchema);