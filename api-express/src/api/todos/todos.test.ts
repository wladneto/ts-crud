import request from 'supertest';

import app from '../../app';
import { Todos } from './todos.model';

beforeAll( async () => {
    try {
        await Todos.drop();
    } catch (error) {}
});

describe('GET /api/v1/todos', () => {
  it('responds with a array of todos', async() => 
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) =>{
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});

describe('POST /api/v1/todos', () => {
  it('responds with an error if the todo body is incorrect', async() => 
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content:'',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) =>{
        //console.log(response.body)
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('stack');
      }),
  );
});

describe('POST /api/v1/todos', () => {
  it('responds with an inserted object if the todo body is correct', async() => 
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content:'Learn TypeScript Wlad',
        done: false,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) =>{
        console.log(response.body)
        //check keys
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
        //check values
        expect(response.body.content).toBe('Learn TypeScript Wlad');
        expect(response.body.done).toBe(false);
      }),
  );
});