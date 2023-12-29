// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    const expires = new Date();
    expires.setDate(expires.getDate() + parseInt(process.env.COOKIE_EXPIRE));

    const options = {
        expires,
        httpOnly: true,
      };
      
    
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;