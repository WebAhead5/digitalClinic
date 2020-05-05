const path = require('path');
const session = require('../../models/sessions.model');

exports.get = (req, res) => {
  if (res.locals.user && res.local.user.sessionID) {
    session.delete(res.locals.user.sessionID);
    res.clearCookies('user_token');
  }
  res.redirect('/');
};
