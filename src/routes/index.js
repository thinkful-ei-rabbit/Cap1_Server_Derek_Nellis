/*
|--------------------------------------------------------------------------
| BARREL EXPORT FILE
|--------------------------------------------------------------------------
| How-To barrel-export components:
| const thingsRouter = require('./things/thingsRouter')
|
| module.exports = {
|   thingsRouter
| }
|
| Why? Readability:
| const { thingsRouter, stuffRouter, userRouter } = require('./routes')
*/
const usersRouter = require('./users.router');
const songsRouter = require('./songs.router');
const songsSetsRouter = require('./songs_sets.router');
const setsRouter = require('./sets.router');
const gigsRouter = require('./gigs.router');

module.exports = {
  usersRouter,
  songsRouter,
  songsSetsRouter,
  setsRouter,
  gigsRouter
};
