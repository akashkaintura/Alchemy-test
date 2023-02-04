import request from 'supertest';
import auth from '../auth/auth.module';
import { TokenExpiredError } from 'jsonwebtoken';

describe('Signup API', () => {
  it('Should sign up a new user', async () => {
    const res = await request(auth).post('/auth/signup').send({
      email: 'testuser@email.com',
      password: 'password',
      name: 'Test User',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });
});

describe('Login API', () => {
  it('Should login a registered user', async () => {
    const res = await request(auth).post('/auth/login').send({
      email: 'testuser@email.com',
      password: 'password',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
  });
});

describe('Logout API', () => {
  it('Should logout a logged in user', async () => {
    const res = await request(auth)
      .post('/auth/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Logout successful');
  });
});
