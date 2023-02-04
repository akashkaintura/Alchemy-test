import { Module } from '@nestjs/common';
import { SwaggerModule, SwaggerDocument } from '@nestjs/swagger';

@Module({
  imports: [
    SwaggerModule.forRootAsync({
      useFactory: async (): Promise<SwaggerDocument> => {
        const options = new SwaggerDocument();
        options.setTitle('My App API');
        options.setDescription('The API description');
        options.setVersion('1.0');
        return options;
      },
    }),
  ],
})
export class SwaggerModule {}
