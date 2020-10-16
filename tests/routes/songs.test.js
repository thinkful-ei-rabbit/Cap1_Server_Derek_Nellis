const knex = require('knex');

const app = require('../../src/app');
const { API, SONGS_TABLE } = require('../../src/constants/table.constants');

const helpers = require('../test-helpers');
const { Get, GetId, Post, Patch, Delete } = require('./route-CRUD-tests');

describe('Route: Songs router', () => {
  const ENDPOINT = `${API}/${SONGS_TABLE}`;

  const { expectedSongs } = helpers.getExpectedData();

  // TODO - xss() testing
  // const {
  //   maliciousSong: { malRequest, malPostResult, malPatchResult }
  // } = helpers.getMaliciousSubmissions();

  const {
    safeSong: { request, postResult, patchResult }
  } = helpers.getClientSubmissions();

  let db;
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DB_URL
    });
    app.set('db', db);
  });

  afterEach('cleanup', () => helpers.cleanTables(db));

  after('disconnect from db', () => db.destroy());

  const seedAllTablesHook = () =>
    beforeEach('seed all data', () => helpers.seedAllTables(db));

  const seedUsersHook = () =>
    beforeEach('seed users', () => helpers.seedUsers(db));

  describe('GET /songs', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 502 and returns an empty array', () =>
        Get.noData(app, ENDPOINT, expectedSongs));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 200 and returns all songs', () =>
        Get.withData(app, ENDPOINT, expectedSongs));
    });
  });

  describe('GET /songs/:id', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 404 and returns an error message', () =>
        GetId.noData(app, ENDPOINT, '/2'));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 200 and returns a song', () =>
        GetId.withData(app, ENDPOINT, '/2', expectedSongs[1]));
    });
  });

  describe('POST /songs', () => {
    seedAllTablesHook();

    it('responds with 201 and returns created song', () => {
      request.id = 4;
      Post.safeData(app, ENDPOINT, request, postResult);
    });
  });

  describe('PATCH /songs/:id', () => {
    seedAllTablesHook();

    it('responds with 201 and returns updated song', () => {
      request.id = 1;
      Patch.safeData(app, ENDPOINT, '/1', request, patchResult);
    });
  });

  describe('DELETE /songs/:id', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 404 and returns an error message', () =>
        Delete.noData(app, ENDPOINT, '/2'));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 201 and returns a confirmation message', () =>
        Delete.withData(app, ENDPOINT, '/2'));
    });
  });
});
