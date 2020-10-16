const knex = require('knex');

const app = require('../../src/app');
const { API, SETS_TABLE } = require('../../src/constants/table.constants');

const helpers = require('../test-helpers');
const { Get, GetId, Post, Patch, Delete } = require('./route-CRUD-tests');

describe('Route: Sets router', () => {
  const ENDPOINT = `${API}/${SETS_TABLE}`;

  const { expectedSets } = helpers.getExpectedData();

  // TODO - xss() testing
  // const {
  //   maliciousSet: { malRequest, malPostResult, malPatchResult }
  // } = helpers.getMaliciousSubmissions();

  const {
    safeSet: { request, postResult, patchResult }
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

  describe('GET /sets', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 502 and returns an empty array', () =>
        Get.noData(app, ENDPOINT, expectedSets));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 200 and returns all songs', () =>
        Get.withData(app, ENDPOINT, expectedSets));
    });
  });

  describe('GET /sets/:id', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 404 and returns an error message', () =>
        GetId.noData(app, ENDPOINT, '/2'));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 200 and returns a song', () =>
        GetId.withData(app, ENDPOINT, '/2', expectedSets[1]));
    });
  });

  describe('POST /sets', () => {
    seedAllTablesHook();

    it('responds with 201 and returns created song', () => {
      request.id = 4;
      Post.safeData(app, ENDPOINT, request, postResult);
    });
  });

  describe('PATCH /sets/:id', () => {
    seedAllTablesHook();

    it('responds with 201 and returns updated song', () => {
      request.id = 1;
      Patch.safeData(app, ENDPOINT, '/1', request, patchResult);
    });
  });

  describe('DELETE /sets/:id', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 404 and returns an error message', () =>
        Delete.noData(app, ENDPOINT, '/2'));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 502 and return empty array', () =>
        Delete.withData(app, ENDPOINT, '/2'));
    });
  });
});
