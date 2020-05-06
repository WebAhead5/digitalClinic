
const port = process.env.PORT || 3000;
const app = require('./server/app.js');

app.listen(port, () => {
    console.log(`The things, the things are happening on ${port}!!`);
    console.log('You can also do this... to show the port %d', port);
});
