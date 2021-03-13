const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");

const routes = require("./controllers");
const sequelize = require("./config/connection");

const hbs = exphbs.create({ helpers });
const SequelStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

// The express.static() method is a built-in Express.js middleware function
// that can take all of the contents of a folder and serve them as static assets.
// This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// set up Handlebars.js as your app's template engine of choice
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Turn on connction to db and db server.

// The "sync" part means that this is Sequelize taking the models
// and connecting them to associated database tables.
// If it doesn't find a table, it'll create it for you!
// The other thing to notice is the use of {force: false} in the .sync() method.
// This doesn't have to be included, but if it were set to true,
// it would drop and re-create all of the database tables on startup (DROP TABLE IF EXISTS)
// This is great for when we make changes to the Sequelize models,
// as the database would need a way to understand that something has changed.
// We'll have to do that a few times throughout this project,
// so it's best to keep the {force: false} there for now.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening to port " + PORT));
});
