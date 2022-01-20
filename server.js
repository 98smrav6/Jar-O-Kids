const path = require('path');
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const rateLimit = require("express-rate-limit");

// limit request ip
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 2 requests per windowMs
  message: "Too many accounts created from this IP, please try again after a minute"
});

//Handlbars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Review session secret - store in dotenv
const sess = {
  secret: 'ThisMySecretOfSecret',
  cookie: {
    // Session will automatically expire in 10 minutes
    expires: 10 * 60 * 1000
},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter); //  apply to all requests

//Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port: ' + PORT));
});
