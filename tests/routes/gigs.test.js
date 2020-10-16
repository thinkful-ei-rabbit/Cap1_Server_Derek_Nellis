const knex = require('knex');

const app = require('../../src/app');
const { API, GIGS_TABLE } = require('../../src/constants/table.constants');

const helpers = require('../test-helpers');
const { Get, GetId, Post, Patch, Delete } = require('./route-CRUD-tests');

describe('Route: Gigs router', () => {
  const ENDPOINT = `${API}/${GIGS_TABLE}`;

  const { expectedGigs } = helpers.getExpectedData();

  // TODO - xss() testing
  // const {
  //   maliciousGig: { malRequest, malPostResult, malPatchResult }
  // } = helpers.getMaliciousSubmissions();

  const {
    safeGig: { request, postResult, patchResult }
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

  describe('GET /gigs', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 502 and returns an empty array', () =>
        Get.noData(app, ENDPOINT, expectedGigs));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 200 and returns all gigs', () =>
        Get.withData(app, ENDPOINT, expectedGigs));
    });
  });

  describe('GET /gigs/:id', () => {
    context('Given no data', () => {
      seedUsersHook();

      it('responds with 404 and returns an error message', () =>
        GetId.noData(app, ENDPOINT, '/2'));
    });

    context('Given data exists', () => {
      seedAllTablesHook();

      it('responds with 200 and returns a gig', () =>
        GetId.withData(app, ENDPOINT, '/2', expectedGigs[1]));
    });
  });

  describe('POST /gigs', () => {
    seedAllTablesHook();

    it('responds with 201 and returns created gig', () => {
      request.id = 4;
      Post.safeData(app, ENDPOINT, request, postResult);
    });
  });

  describe('PATCH /gigs/:id', () => {
    seedAllTablesHook();

    it('responds with 201 and returns updated gig', () => {
      request.id = 1;
      Patch.safeData(app, ENDPOINT, '/1', request, patchResult);
    });
  });

  describe('DELETE /gigs/:id', () => {
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
