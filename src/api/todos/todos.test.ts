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

let id = '';

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
        //get id to use in next test
        id = response.body._id;
      }),
  );
});

describe('GET /api/v1/todos/:id', () => {
  it('responds with a single todo', async() => 
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) =>{
        //check keys
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
        //check values
        expect(response.body.content).toBe('Learn TypeScript Wlad');
        expect(response.body.done).toBe(false);
        expect(response.body._id).toBe(id)
      }),
  );

  it('responds with a not found Error', async() => 
    request(app)
      .get(`/api/v1/todos/634970f73cbf6bac2eda9f2b`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) =>{
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('stack');
      }),
  );

  it('responds with a invalid ObjectId error', (done) => {
    request(app)
      .get(`/api/v1/todos/wlad`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) =>{
        console.log(response.body.message)
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('stack');
        done();
      });
    });
});