const { JWT } = require('../test-helpers');

const headers = { 'Content-Type': 'application/json', Authorization: JWT };

const Get = {
  noData(app, endpoint) {
    return supertest(app).get(endpoint).set(headers).expect(502, []);
  },

  withData(app, endpoint, expectedData) {
    return supertest(app).get(endpoint).set(headers).expect(200, expectedData);
  }
};

const GetId = {
  noData(app, endpoint, id) {
    return supertest(app)
      .get(endpoint + id)
      .set(headers)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).to.eql('Data not found');
      });
  },

  withData(app, endpoint, id, expectedData) {
    return supertest(app)
      .get(endpoint + id)
      .set(headers)
      .expect(200, expectedData);
  }
};

const Post = {
  safeData(app, endpoint, request, result) {
    return supertest(app)
      .post(endpoint)
      .set(headers)
      .send(request)
      .expect(201)
      .expect((res) => {
        expect(res.body).to.eql(result);
      });
  }
};

const Patch = {
  safeData(app, endpoint, id, request, result) {
    return supertest(app)
      .patch(endpoint + id)
      .set(headers)
      .send(request)
      .expect(201)
      .expect((res) => {
        expect(res.body).to.eql(result);
      });
  }
};

const Delete = {
  noData(app, endpoint, id = '') {
    return supertest(app)
      .delete(endpoint + id)
      .set(headers)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).to.eql('Data not found');
      });
  },

  withData(app, endpoint, id = '') {
    return supertest(app)
      .delete(endpoint + id)
      .set(headers)
      .expect(201)
      .expect((res) => {
        expect(res.body.message).to.eql('Successfully deleted');
      });
  }
};

module.exports = {
  Get,
  GetId,
  Post,
  Patch,
  Delete
};
