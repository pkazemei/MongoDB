const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema ({
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    userName: {
      type: String,
      required: [true, 'Username is required'],
      validate: {
        validator: val => /^[a-zA-Z0-9]+$/i.test (val),
        message: 'Username is strictly alphanumeric',
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be 8 characters or longer'],
    },
    checking: {
      type: Number,
      required: [true, 'Initial deposit is required']
    },
    savings: {
      type: Number
    },
    swiss: {
      type: Number
    }
  },
  {timestamps: true}
);

UserSchema.virtual ('confirm')
  .get (function () {
    return this._confirm;
  })
  .set (function (value) {
    this._confirm = value;

  });


UserSchema.pre ('validate', function (next) {
  if (this.password !== this._confirm) {
    this.invalidate ('confirm', 'Password must match confirm password');
  }
  next ();
});

UserSchema.pre ('save', function (next) {
  bcrypt
    .hash (this.password, 10)
    .then (hash => {
      this.password = hash;
      next ();
    })
    .catch (err => {
      console.log ('hashing failed', err);
      next ();
    });
});


module.exports = mongoose.model ('User', UserSchema);
