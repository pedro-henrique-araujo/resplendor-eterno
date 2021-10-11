let express = require('express');
let app = express();
let cors = require('cors');
let routes = require('./routes');
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log('listening on http://localhost:' + PORT));