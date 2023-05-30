import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';
import { ErrorsMessages } from '../constants';

@Injectable()
export abstract class BaseService<
  T,
  CreateDto extends Record<string, any>,
  UpdateDto extends Record<string, any>,
> {
  protected constructor(private readonly genericModel: Model<T & Document>) {}

  async create(createDto: CreateDto) {
    if (
      (await this.modelHasIndex('name_1')) &&
      (await this.genericModel.exists({ name: createDto.name }))
    ) {
      throw new ConflictException(
        `${this.genericModel.modelName} ${ErrorsMessages.NAME_EXIST}`,
      );
    }

    return this.genericModel.create(createDto);
  }

  async createMany(createDtoArray: CreateDto[]) {
    if (await this.modelHasIndex('name_1')) {
      for (const createDto of createDtoArray) {
        if (await this.genericModel.exists({ name: createDto.name })) {
          throw new ConflictException(
            `${this.genericModel.modelName} ${ErrorsMessages.NAME_EXIST}`,
          );
        }
      }
    }

    return this.genericModel.insertMany(createDtoArray);
  }

  findAll(filter: FilterQuery<T> = {}, populate: string[] = []) {
    return this.genericModel.find(filter).populate(populate);
  }

  async findOne(filter: FilterQuery<T>, populate: string[] = []) {
    const object = await this.genericModel.findOne(filter).populate(populate);

    if (!object) {
      throw new NotFoundException(
        `${this.genericModel.modelName} ${ErrorsMessages.NOT_FOUND}`,
      );
    }

    return object;
  }

  async update(filter: FilterQuery<T>, updateDto: UpdateDto) {
    if (!(await this.genericModel.exists(filter))) {
      throw new NotFoundException(
        `${this.genericModel.modelName} ${ErrorsMessages.NOT_FOUND}`,
      );
    }

    if (
      updateDto.hasOwnProperty('name') &&
      (await this.genericModel.exists({ name: updateDto.name }))
    ) {
      throw new ConflictException(
        `${this.genericModel.modelName} ${ErrorsMessages.NAME_EXIST}`,
      );
    }

    return this.genericModel.findOneAndUpdate(filter, updateDto, {
      new: true,
    });
  }

  async remove(filter: FilterQuery<T>) {
    if (!(await this.genericModel.exists(filter))) {
      throw new NotFoundException(
        `${this.genericModel.modelName} ${ErrorsMessages.NOT_FOUND}`,
      );
    }

    return this.genericModel.findOneAndDelete(filter);
  }

  private async modelHasIndex(indexName: string) {
    const indexes = await this.genericModel.listIndexes();

    return indexes.some((index) => index.name === indexName);
  }

  count(filter: FilterQuery<T>) {
    return this.genericModel.count(filter);
  }
}
