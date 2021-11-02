let express = require('express');
let app = express();
let cors = require('cors');
let routes = require('./routes');


let {server, serverPort} = require('./environment');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static('public'));
app.listen(serverPort, () => {
    console.log(`Listening on ${server}`);
});