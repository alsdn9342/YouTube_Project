const dboperations = require('./dboperations');

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
const {response, request} = require('express');
let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
})


let port = process.env.PORT || 8091;
app.listen(port);
console.log('YouTube API is running at ' + port);