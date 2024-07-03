import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseFilters,
  ParseIntPipe,
  HttpStatus,
  UsePipes,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { HttpExceptionFilter } from 'src/shared/exception-filters/http-exception.filter';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { createCatSchema } from './schemas/cats.validation';
import { Role } from 'src/shared/enums/role.enum';
import { CacheService } from 'src/core/configs/cache/cache.service';
import { Request, Response } from 'express';
import { PoliciesGuard } from 'src/shared/guards/policies.guard';
import { CheckPolicies } from 'src/shared/casl/check-policies';
import { Action, AppAbility, User } from 'src/shared/casl/casl-ability.factory';

@Controller('cats')
export class CatsController {
  private readonly _logger = new Logger(CatsController.name);

  constructor(
    private readonly catsService: CatsService,
    private readonly cacheService: CacheService,
  ) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    this._logger.log(`TRIGGER!`);
    return this.catsService.create(createCatDto);
  }

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  async findAll(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this._logger.log('request?.cookies ' + request.cookies['key']); // or "request.cookies['cookieKey']"

    this._logger.log(`TRIGGER!`);
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    this._logger.log(`TRIGGER!`);
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    this._logger.log(`TRIGGER!`);
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this._logger.log(`TRIGGER!`);
    return this.catsService.remove(+id);
  }
}
