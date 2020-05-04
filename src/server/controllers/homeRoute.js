/*

exports.get= (req, res, next) => {
    res.sendFile('index');
};

 */

exports.get = (req, res) => {
  res.render('home', {
    title: 'pokemon',
    body: 'rendered!!!',
  });
};
