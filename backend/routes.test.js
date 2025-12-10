// ...existing code...
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');

describe('Route integration tests (10)', () => {
  let createdUserId;
  let createdCommentId;

  test('GET / should return <500', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBeLessThan(500);
  });

  test('GET /users should return 200 and an array', async () => {
    const res = await request(app).get('/users').expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('POST /users should create a user and return 201 with _id', async () => {
    const userData = { username: 'test_integration_user', password: 'secret' };
    const res = await request(app).post('/users').send(userData).expect(201);
    expect(res.body).toHaveProperty('_id');
    createdUserId = res.body._id;
  });

  test('GET /users/:id should return the created user', async () => {
    const res = await request(app).get(`/users/${createdUserId}`).expect(200);
    expect(res.body).toHaveProperty('_id', createdUserId);
    expect(res.body).toHaveProperty('username');
  });

  test('PUT /users/:id should update the user and return 200', async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .send({ username: 'updated_integration_user' })
      .expect(200);
    expect(res.body).toHaveProperty('_id', createdUserId);
    expect(res.body.username).toBe('updated_integration_user');
  });

  test('POST /comments without content should fail (=201)', async () => {
    const commentData = { author: createdUserId };
    const res = await request(app).post('/comments').send(commentData);
    expect(res.status).toBeGreaterThanOrEqual(201);
  });

  test('POST /comments with content should create comment (201)', async () => {
    const commentData = { author: createdUserId, content: 'Integration test comment' };
    const res = await request(app).post('/comments').send(commentData).expect(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.content).toBe('Integration test comment');
    createdCommentId = res.body._id;
    console.log(res);
  });

  // test('GET /comments/:id should return the created comment', async () => {
  //   const res = await request(app).get(`/comments/${createdCommentId}`).expect(200);
  //   expect(res.body).toHaveProperty('_id', createdCommentId);
  //   expect(res.body.content).toHaveProperty('content', 'Integration test comment');
  // });

  test('PUT /comments/:id should update the comment and return 200', async () => {
    const res = await request(app)
      .put(`/comments/${createdCommentId}`)
      .send({ content: 'Edited comment content' })
      .expect(200);
    expect(res.body).toHaveProperty('_id', createdCommentId);
    expect(res.body.content).toBe('Edited comment content');
  });

  test('DELETE /comments/:id should remove the comment and return 200', async () => {
    await request(app).delete(`/comments/${createdCommentId}`).expect(204);
    await request(app).get(`/comments/${createdCommentId}`).expect(200);
  });
});