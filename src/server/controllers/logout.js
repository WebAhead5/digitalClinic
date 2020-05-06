


exports.get = (req, res) => {

  // if (res.locals.user)
  //   session.delete(res.locals.user.sessionID);

  res.clearCookie('user_token');
  res.redirect('/');

};

