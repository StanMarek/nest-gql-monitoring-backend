import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base.service';
import { ErrorsMessages } from 'src/constants';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async create(createDto: CreateUserInput) {
    await this.userIsUnique(createDto.phone, createDto.email);

    return super.create(createDto);
  }

  async userIsUnique(phone: string, email: string) {
    const user = await this.userModel.findOne({
      $or: [{ phone }, { email }],
    });

    if (user && user.phone === phone) {
      throw new BadRequestException(ErrorsMessages.PHONE_EXIST);
    }

    if (user && user.email === email) {
      throw new BadRequestException(ErrorsMessages.EMAIL_EXIST);
    }
  }
}
