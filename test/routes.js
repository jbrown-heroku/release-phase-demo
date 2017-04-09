const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const test = require('tape');

let db = require('../models');

test.onFinish(function () {
  db.sequelize.close()
})

test('GET /', t => {
  api
  .get('/')
  .expect(200)
  .end((err, res) => {
    if (err) {
      t.fail(err);
      t.end();
    } else {
      t.ok(res.body, 'It should have a response body');
      t.end();
    }
  });
});

// Ensure we get a 404 when trying to GET an unknown route
test('GET unknown route', t => {
  api
  .get(`/unknown-route`)
  .expect(404)
  .end((err, res) => {
    if (err) {
      t.fail(err);
      t.end();
    } else {
      t.pass('It should return 404')
      t.end();
    }
  });
});
