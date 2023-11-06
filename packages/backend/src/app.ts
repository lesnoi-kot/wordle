import { Injectable, Module, Controller, Get, Query } from '@nestjs/common';

type WordHandle = number;

@Injectable()
export class WordleService {
  getHello(): string {
    return 'Hello World!';
  }

  selectWord(): WordHandle {
    return 0;
  }
}

@Controller('/words')
export class WordleController {
  constructor(private readonly appService: WordleService) {}

  @Get('/random')
  getRandomWordHandle() {
    return {
      wordHandle: 0,
    };
  }

  @Get('/check')
  checkWord() {
    //
    return '';
  }
}

@Module({
  imports: [],
  controllers: [WordleController],
  providers: [WordleService],
})
export class AppModule {}
