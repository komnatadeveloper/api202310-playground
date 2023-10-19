//index.js
const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const cors = require('cors');
const { socketIoManage } = require('./utils/socket/socket-io-manage');
// const { createGraphQL } = require('./utils/graphql/createGraphQL');
const { createGraphQLHandlerViaGraphQLHttp } = require('./utils/graphql-with-graphql-http/createGraphQLHandlerViaGraphQLHttp');

app.use(cors());


createGraphQLHandlerViaGraphQLHttp

// app.use(
//   "/graphql",
//   createGraphQL()
// )


app.all(
  "/graphql",
  createGraphQLHandlerViaGraphQLHttp()
)





app.get('/api', (req, res) => {
  console.log(`app.get('/api', (req, res) -> FIRED`)
  res.json({
    message: 'Hello world',
  });
});

const _server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


socketIoManage(_server);

