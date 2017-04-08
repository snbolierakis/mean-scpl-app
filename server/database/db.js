//Database setup
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    timesLogged: {type: Number,default: 0},
    lastLogged: {type: Date},
    poisCreated: {type: Number,default: 0},
    campaignsCreated: {type: Number,default: 0},
    language: {
      type: String,
      enum: ['Eng', 'Gr', 'Rom'],
      default: 'Eng'
    }
  },
  role: {
    type: String,
    enum: ['Member', 'Client', 'Owner', 'Admin'],
    default: 'Member'
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }

},
{
  timestamps: true
});

UserSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}


module.exports = mongoose.model('user', UserSchema);
