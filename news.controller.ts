// news.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('news')
@ApiTags('news')
export class NewsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Fetch news or top headlines from news API' })
  @ApiResponse({ status: 200, description: 'News fetched successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getNews(@Query('search') search?: string) {
    const news = await this.newsService.getNews(search);
    return { count: news.length, data: news };
  }
}
