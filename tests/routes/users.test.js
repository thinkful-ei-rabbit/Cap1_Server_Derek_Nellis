const knex = require('knex');

const app = require('../../src/app');
const {
  API,
  LOGIN,
  REGISTER,
  USERS_TABLE
} = require('../../src/constants/table.constants');

const helpers = require('../test-helpers');
const { Delete } = require('./route-CRUD-tests');

describe('Route: Users router', () => {
  const { JWT, USER_NAME_PASS } = helpers;
  const LOGIN_EP = `${API}/${LOGIN}`;
  const REGISTER_EP = `${API}/${REGISTER}`;
  const DELETE_EP = `${API}/${USERS_TABLE}/delete`;

  const headers = { 'Content-Type': 'application/json', Authorization: JWT };

  // TODO - xss() testing
  // const {
  //   maliciousUser: { malRequest, malResult }
  // } = helpers.getMaliciousSubmissions();

  const {
    safeUser: { request, result }
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

  const seedUsersHook = () => {
    beforeEach('seed users', () => helpers.seedUsers(db));
  };

  describe('GET /login (with auth)', () => {
    context('Given no data', () => {
      it('responds with 401 and returns an auth error', () =>
        supertest(app)
          .get(LOGIN_EP)
          .set(headers)
          .expect(404)
          .expect((res) => expect(res.body.message).to.eql('Data not found')));
    });

    context('Given data exists', () => {
      seedUsersHook();

      it('responds with 200 and returns a username', () =>
        supertest(app)
          .get(LOGIN_EP)
          .set(headers)
          .expect(200)
          .expect((res) => {
            expect(res.body.username).to.eql(USER_NAME_PASS.user_name);
          }));
    });
  });

  describe('POST /login', () => {
    context('Given no data', () => {
      it('responds with 401 and returns an auth error', () =>
        supertest(app)
          .post(LOGIN_EP)
          .send(USER_NAME_PASS)
          .expect(400)
          .expect((res) =>
            expect(res.body.error).to.eql("Incorrect 'User Name'")
          ));
    });

    context('Given data exists', () => {
      seedUsersHook();

      it('responds with 200 and returns a username and token', () =>
        supertest(app)
          .post(LOGIN_EP)
          .send(USER_NAME_PASS)
          .expect(200)
          .expect((res) => {
            const { authToken, user_name } = res.body;

            expect(authToken).to.be.a('string');
            expect(user_name).to.eql(USER_NAME_PASS.user_name);
          }));
    });
  });

  describe('POST /register', () => {
    it('responds with 201 and returns a username and token', async () => {
      const { user_name } = result;

      await supertest(app)
        .post(REGISTER_EP)
        .send(request)
        .expect(201)
        .expect((res) => {
          expect(res.body.authToken).to.be.a('string');
          expect(res.body.user_name).to.eql(user_name);
        });

      const [user] = await db(USERS_TABLE).select('*').where({ user_name });

      expect(user.id).to.eql(1);
      // TODO - hash testing (separate test)
      // expect(user.password).to.eql(hash);
    });
  });

  describe('DELETE /delete', () => {
    context('Given no data', () => {
      it('responds with 404 and returns an error message', () =>
        Delete.noData(app, DELETE_EP));
    });

    context('Given data exists', () => {
      seedUsersHook();

      it('responds with 201 and returns a confirmation message', () =>
        Delete.withData(app, DELETE_EP));
    });
  });
});
