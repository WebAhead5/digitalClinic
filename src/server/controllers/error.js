const path = require('path');

/**todo send error html files/templates **/

exports.client = (req, res) => {
    res
        .status(404)
        .send("404 - page not found");
};

exports.server = (err, req, res, next) => {
    console.log(err.message);
    res
        .status(500)
        .send("500 - server error");
};