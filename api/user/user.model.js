const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: true
    },
    lastName: {
      type: String,
      lowercase: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true
  }
)

UserSchema.methods.comparePassword = async function (password) {
    const user = this
    return await bcrypt.compare(password, user.password)
  }
  

UserSchema.pre('save', async function(next) {
  const user = this
  try {
    if (!user.isModified('password')) {
      return next()
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash

  } catch(error) {
    next(error)
  }
  next()
})

UserSchema.virtual('profile').get(function() {
    const { firstName, lastName, email } = this
  
    return { fullName: `${firstName} ${lastName}`, email }
  })
  

module.exports = mongoose.model('User', UserSchema)
