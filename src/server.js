const app = require("./app");
const environment = require('./environment/environment');

app.listen(environment.port, environment.host);