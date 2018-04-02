const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((request, response, next) => {
  var now = new Date().toString();
  console.log(`${now}: ${request.method} ${request.url}`);
  next();
});

app.use((request, response, next) => {
  if(request.url === '/about'){
    response.render('maintenance.hbs');
  }
  else{
    next();
  }
});

app.use(express.static(__dirname + '/public'));




hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (request, response, next) => {
  // response.send('<h1>Hello Express</h1>');
  console.log('This is the URL: ', request.url);
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the website'
  });
  // next('route');
});


app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


app.listen(3000, () => {
  console.log('server is running on port 3000');
});
