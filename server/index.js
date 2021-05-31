let express = require("express"),
    app = express();
    http = require("http");
    server = http.createServer(app);
    mongoose = require('mongoose');

let methodOverride = require('method-override');

//Import Models and controllers
let contactoController = require('./controllers/contactoController');

//Connection to DB
mongoose.connect('mongodb://localhost/agenda', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
})

app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
});

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride());

//Example route
let router = express.Router();

router.get('/', function(req, res) {
    res.send("Hello World!");
});

app.use(router);

//API routes
let contactosRouter = express.Router();

contactosRouter.route('/contacto')
    .get(contactoController.findAllContactos)
    .post(contactoController.addContacto);

contactosRouter.route('/contacto/:id')
    .get(contactoController.findById)
    .put(contactoController.updateContacto)
    .delete(contactoController.deleteContacto);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/', contactosRouter);