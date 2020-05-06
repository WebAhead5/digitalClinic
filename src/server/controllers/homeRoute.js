/*

exports.get= (req, res, next) => {
    res.sendFile('index');
};

 */

exports.get = (req, res) => {
  res.render('home', {
    body: 'rendered!!!'
  });
};
