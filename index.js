var express = require('express');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// var allRoutes = require('./controllers');

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// app.use('/',allRoutes);

const frontendRoutes = require("./controllers/frontendController");
app.use(frontendRoutes);

const userRoutes = require("./controllers/userController");
app.use("/api/users",userRoutes);

const reviewRoutes = require("./controllers/reviewController");
app.use("/api/reviews",reviewRoutes);


db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});