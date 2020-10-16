const knex = require('knex');
const app = require('../../src/app');

describe.skip('Middleware: Error-Handlers', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'db',
      connection: TEST_DB_URL
    });
    app.set('db', db);
  });

  before('cleanup', () => db.cleanTables(db))

  afterEach('cleanup', () => db.cleanTables(db))

  after('disconnect from db', () => db.destroy())
})