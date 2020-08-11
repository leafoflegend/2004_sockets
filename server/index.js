const express = require('express');
const chalk = require('chalk');
const path = require('path');
const enableWs = require('express-ws');
const uuid = require('uuid');

const PORT = process.env.PORT || 3000;

const app = express();

enableWs(app);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

app.ws('/connect', (ws, req) => {
  console.log('Connection established!');

  ws.on('message', (msg) => {
    const messageWithId = {
      ...JSON.parse(msg),
      id: uuid.v4(),
    };

    console.log('Message With ID: ', messageWithId);

    ws.send(JSON.stringify(messageWithId));
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
});
