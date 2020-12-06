require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const color = require('chalk');

const app = express();
const port = (process.env.PORT || 8080);

const appRoute = require('./routes/app');
const apiRoute = require('./routes/api');

const publicPath = path.join(__dirname + '/../public');
const viewPath = path.join(publicPath + '/views');

app.set('view engine', 'ejs');
app.set('views', viewPath);
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', appRoute);
app.use('/api', apiRoute);

// Error Handler
app.use((err, req, res) => {
  let statusCode = (err.status || 500);
  console.log(`${statusCode} : ${err.message}`);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(color.yellow('███████╗ █████╗ ████████╗███╗   ███╗ ██████╗ ██████╗ '));
  console.log(color.yellow('██╔════╝██╔══██╗╚══██╔══╝████╗ ████║██╔═══██╗██╔══██╗'));
  console.log(color.yellow('█████╗  ███████║   ██║   ██╔████╔██║██║   ██║██║  ██║'));
  console.log(color.yellow('██╔══╝  ██╔══██║   ██║   ██║╚██╔╝██║██║   ██║██║  ██║'));
  console.log(color.yellow('███████╗██║  ██║   ██║   ██║ ╚═╝ ██║╚██████╔╝██████╔╝'));
  console.log(color.yellow('╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ '));                 
  console.log('> EatMod server is up on ' + color.green(`http://localhost:${port}`));
});
