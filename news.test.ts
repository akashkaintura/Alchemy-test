import request from 'supertest';
import news from '../news/news.module';

describe('News API', () => {
  it('Should fetch top news headlines', async () => {
    const res = await request(news)
      .get('/news')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('count');
    expect(res.body).toHaveProperty('data');
  });
});
