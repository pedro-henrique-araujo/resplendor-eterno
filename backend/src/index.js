let express = require('express');
let app = express();
let cors = require('cors');
let routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);