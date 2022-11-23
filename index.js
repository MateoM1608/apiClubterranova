const server = require('./src/app.js');
// const { conn } = require('./src/db.js');

// Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
//   server.listen(3001, () => {
//     console.log('Is listening at 3001'); // eslint-disable-line no-console
//   });
// });

require('./src/db')

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`'Is listening at ${PORT}`); // eslint-disable-line no-console
});