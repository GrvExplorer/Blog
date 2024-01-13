import pkgb from 'bcryptjs';
import pkgj from 'jsonwebtoken';
import mongoose from "mongoose";
const { hash, compare } = pkgb;
const { sign } = pkgj;

const UserSchema = new mongoose.Schema({
avatar: { type: String, default: ''},
name : { type: String, required: true},
email: { type: String, required: true},
password: { type: String, required: true},
verified: { type: Boolean, default: false},
verificationCode: { type: String, required: false },
admin: { type: Boolean, default: false},

}, {
  timestamps: true,
})
 

UserSchema.pre('save', async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
  return next();
});

UserSchema.methods.generate_token = function() {
  return sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '30d'}) 
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
  console.log(candidatePassword+ '  ' + this.password);
  return await compare(candidatePassword, this.password)
}
  
const User = mongoose.model('User', UserSchema)

export default User;