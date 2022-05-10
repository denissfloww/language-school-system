import { Injectable, Logger } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../models/language.entity';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    return await this.languageRepository.save({
      ...createLanguageDto,
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const skip =
      (pageOptionsDto.page - 1) * pageOptionsDto.take;
    Logger.debug(pageOptionsDto.page);
    Logger.debug(pageOptionsDto.take);
    Logger.debug(skip);
    const [list, count] = await this.languageRepository.findAndCount({
      order: {
        createdAt: pageOptionsDto.order,
      },
      take: pageOptionsDto.take,
      skip: isNaN(skip) ? undefined : skip,
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto,
    });
    return new PageDto(list, pageMetaDto);
  }

  async findOne(id: number) {
    const language = await this.languageRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (language) {
      return language;
    }

    throw new NotFoundException();
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const language = await this.languageRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (language) {
      await this.languageRepository.update(id, {
        ...updateLanguageDto,
      });

      return;
    }

    throw new NotFoundException();
  }

  async remove(id: number) {
    const language = await this.languageRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (language) {
      await this.languageRepository.remove(language);

      return;
    }

    throw new NotFoundException();
  }
}
