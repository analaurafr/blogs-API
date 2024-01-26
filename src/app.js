const express = require('express');
const { login } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', login);

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
