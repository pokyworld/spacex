const express = require("express");
const graphqlHTTP = require('express-graphql');
const cors = require("cors");
const https = require("https");
const path = require("path");
const fs = require("fs");

const schema = require("./graphql/spacex");
const app = express();

// Allow CORS
app.use(cors());

// The only router
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true  // turn off for production
}));

app.use(express.static(__dirname + '/assets'));

const port = process.env.port || 8443;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const httpsOptions = {
    host: "localhost",
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'localhost.crt')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'localhost.key')),
};
https.createServer(httpsOptions, app)
    .listen(port, () => console.log(`Server started. Listening on port: ${port}`));

// app.listen(port, () => console.log(`Server started. Listening on port: ${port}`));