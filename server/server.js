'use strict'
const
    express = require("express"), //express
    app = express(), //on renomme express app
    bodyParser = require("body-parser"), // on parse la data
    port = process.env.port || 9000


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("../public/")); // on definit le dossier statique (la route principale)


app.listen(port,
    function() {
        console.log("Le serveur demarre sur http://localhost:" + port)
    })