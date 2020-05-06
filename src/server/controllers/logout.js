
const sessionM = require("../../models/sessions.model")

exports.get =async (req, res) => {


  try {
    await sessionM.endSession(res.locals.user.sessionID);
  } catch (e) {
  }

  res.clearCookie('user_token');
  res.redirect('/');

};

