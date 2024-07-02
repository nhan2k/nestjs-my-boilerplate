import { Injectable, Logger } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly _logger = new Logger(CatsService.name);
  private readonly cats: Cat[] = [];

  constructor() {}

  create(createCatDto: CreateCatDto) {
    this._logger.log(`TRIGGER!`);
    return 'This action adds a new cat';
  }

  async findAll(): Promise<Cat[]> {
    this._logger.log(`TRIGGER!`);
    return this.cats;
  }

  findOne(id: number) {
    this._logger.log(`TRIGGER!`);
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    this._logger.log(`TRIGGER!`);
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    this._logger.log(`TRIGGER!`);
    return `This action removes a #${id} cat`;
  }
}
