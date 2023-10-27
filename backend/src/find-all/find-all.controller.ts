import { Controller, Get } from '@nestjs/common';
import { FindAllService } from './find-all.service';

@Controller('find-all')
export class FindAllController {
  constructor(private findAllService: FindAllService) {}

  @Get()
  findAll() {
    const result = this.findAllService.findAll();
    console.log(result);
    return result;
  }
}
