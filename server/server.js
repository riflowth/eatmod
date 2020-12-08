require('./config/config');

const path = require('path');
const color = require('chalk');
const log = require('./utils/log');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./auth/passport');
const knex = require('./database/knex');
const KnexSessionStore = require('connect-session-knex')(session);

const app = express();
const port = (process.env.PORT || 8080);

const appRoute = require('./routes/app');
const apiRoute = require('./routes/api');
const authRoute = require('./routes/auth');

const publicPath = path.join(__dirname + '/../public');
const viewPath = path.join(publicPath + '/views');

app.set('view engine', 'ejs');
app.set('views', viewPath);
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'eatmod-cpe34',
        saveUninitialized: false,
        resave: true,
        store: new KnexSessionStore({
            knex: knex,
            tablename: 'sessions'
        })
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', appRoute);
app.use('/api', apiRoute);
app.use('/auth', authRoute);

// Error Handler
app.use((req, res) => {
    if (req.url.startsWith('/assets/images')) {
        res.redirect('https://lh3.googleusercontent.com/MgJS2D26eWVE9wOQ14vYQhVvot7NsgTsL9Fm-C8NwGC8Tn277Py-piniyyI5JkfyWLY4=s143');
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(color.yellow('███████╗ █████╗ ████████╗███╗   ███╗ ██████╗ ██████╗ '));
    console.log(color.yellow('██╔════╝██╔══██╗╚══██╔══╝████╗ ████║██╔═══██╗██╔══██╗'));
    console.log(color.yellow('█████╗  ███████║   ██║   ██╔████╔██║██║   ██║██║  ██║'));
    console.log(color.yellow('██╔══╝  ██╔══██║   ██║   ██║╚██╔╝██║██║   ██║██║  ██║'));
    console.log(color.yellow('███████╗██║  ██║   ██║   ██║ ╚═╝ ██║╚██████╔╝██████╔╝'));
    console.log(color.yellow('╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ '));
    log.success(log.prefix.WEB, `Server is up on http://localhost:${port}`);

    knex.raw('select 0').catch(err => {
        log.error(log.prefix.DATABASE, `${err.sqlMessage || err.code}`);
        log.warn(log.prefix.WEB, `Server has closed...!`);
        process.exit();
    }).finally(() => {
        log.success(log.prefix.DATABASE, `The database connection established`);
    });
});