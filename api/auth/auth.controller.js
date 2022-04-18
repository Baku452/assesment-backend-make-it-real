const { signToken } = require('../auth/auth.service')

const { findUser } = require('../user/user.service')
const User = require('../user/user.model')

async function loginUserHandler(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(500).json({ message: "Wrong password"})
    }
  
    console.log(user.profile);
    const token = signToken(user.profile)
    return res.status(200).json({token})


  } catch(error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
  loginUserHandler,
}
