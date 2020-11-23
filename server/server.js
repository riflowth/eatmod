require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const knex = require('./database/knex');
const color = require('chalk');

const app = express();
const port = 8080;

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
app.use('/api', apiRoute)

app.listen(port, () => {
  console.log(color.yellow('███████╗ █████╗ ████████╗███╗   ███╗ ██████╗ ██████╗ '));
  console.log(color.yellow('██╔════╝██╔══██╗╚══██╔══╝████╗ ████║██╔═══██╗██╔══██╗'));
  console.log(color.yellow('█████╗  ███████║   ██║   ██╔████╔██║██║   ██║██║  ██║'));
  console.log(color.yellow('██╔══╝  ██╔══██║   ██║   ██║╚██╔╝██║██║   ██║██║  ██║'));
  console.log(color.yellow('███████╗██║  ██║   ██║   ██║ ╚═╝ ██║╚██████╔╝██████╔╝'));
  console.log(color.yellow('╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ '));                        
  console.log('> EatMod server is up on ' + color.green(`http://localhost:${port}`));
})
