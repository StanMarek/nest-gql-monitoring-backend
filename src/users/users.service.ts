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

  create(createDto: CreateUserInput) {
    const user = this.userModel.findOne({ email: createDto.email });
    if (user) {
      throw new BadRequestException(ErrorsMessages.EMAIL_EXIST);
    }
    return super.create(createDto);
  }
}
