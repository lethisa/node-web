// load express module
const express = require('express');
// load handlebar module
const hbs = require('hbs');
// load fs module
const fs = require('fs');
// make constant - port
const port = process.env.PORT || 3000;
// use express js
var app = express();
// hbs partials
hbs.registerPartials(__dirname + '/views/partials');
// hbs helper - get year
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
// hbs helper - get capitalize
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// listen server
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

// ============================================================================

// create middlewear - log
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to write log');
    } else {
      next();
    }
  });

});

// middlewear maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// make static web - access folder
app.use(express.static(__dirname + '/public'));
// use hbs
app.set('view engine', 'hbs');
// http route handler - home
app.get('/', (req, res) => {
  // res.send('<h1>Hai Express!</h1>');
  // res.send({
  //   name: 'lethisa',
  //   likes: [
  //     'reading',
  //     'watching'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    // currentYear: new Date().getFullYear()
  });
});
// route about
app.get('/about', (req, res) => {
  // res.send('about page');

  // render from hbs template
  res.render('about.hbs', {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});
// bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  });
});
