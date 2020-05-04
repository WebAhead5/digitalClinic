const path = require('path');
const session = require('../../models/sessions.model');

module.exports = (req, res) => {
  if (res.locals.user && res.local.user.sessionID) {
    session.delete(res.locals.user.sessionID);
    res.clearCookies('user_token');
  }
  res.redirect('/');
};
