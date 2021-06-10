require('./config/config');

// Utility modules
const path          = require('path');
const color         = require('chalk');
const log           = require('./utils/log');

// Main modules
const express       = require('express');
const session       = require('express-session');
const passport      = require('./auth/passport');
const knex          = require('./database/knex');
const Instagram     = require('./models/instagram');

// First check database connection
knex.raw('select 0').catch(err => {
    log.error(log.prefix.DATABASE, `${err.sqlMessage || err.code}`);
    log.warn(log.prefix.WEB, `Server has closed...!`);
    process.exit();
}).finally(() => {
    log.success(log.prefix.DATABASE, `The database connection established`);
});

Instagram.initialize();

const SessionStore  = require('connect-session-knex')(session);
const app           = express();
const port          = (process.env.PORT || 8080);

// Directory
const publicPath    = path.join(__dirname + '/../public');
const viewPath      = path.join(publicPath + '/views');

// Initialize Express for sessioning and authentication
app.set('view engine', 'ejs');
app.set('views', viewPath);
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'eatmod-cpe34',
        saveUninitialized: false,
        resave: true,
        store: new SessionStore({
            knex: knex,
            tablename: 'sessions'
        })
    })
);
app.use(passport.initialize());
app.use(passport.session());

// All routes
const appRoute      = require('./routes/app');
const apiRoute      = require('./routes/api');
const authRoute     = require('./routes/auth');

app.use('/', appRoute);
app.use('/api', apiRoute);
app.use('/auth', authRoute);

// Error Handler
app.use((req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(color.yellow('███████╗ █████╗ ████████╗███╗   ███╗ ██████╗ ██████╗ '));
    console.log(color.yellow('██╔════╝██╔══██╗╚══██╔══╝████╗ ████║██╔═══██╗██╔══██╗'));
    console.log(color.yellow('█████╗  ███████║   ██║   ██╔████╔██║██║   ██║██║  ██║'));
    console.log(color.yellow('██╔══╝  ██╔══██║   ██║   ██║╚██╔╝██║██║   ██║██║  ██║'));
    console.log(color.yellow('███████╗██║  ██║   ██║   ██║ ╚═╝ ██║╚██████╔╝██████╔╝'));
    console.log(color.yellow('╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ '));
    log.success(log.prefix.WEB, `Server is up on http://localhost:${port}`);
});