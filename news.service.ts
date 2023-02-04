import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NewsService {
  httpService: any;
  constructor(
    private readonly newsService: NewsService,
    private readonly jwtService: JwtService,
  ) {}
  async getNews(search?: string) {
    try {
      const response = await this.httpService
        .get(
          `https://newsapi.org/v2/top-headlines?q=${search}&apiKey=${process.env.NEWS_API_KEY}`,
        )
        .toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
