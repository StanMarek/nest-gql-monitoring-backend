import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base.service';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Location, LocationDocument } from './entities/location.entity';

@Injectable()
export class LocationsService extends BaseService<
  Location,
  CreateLocationInput,
  UpdateLocationInput
> {
  constructor(
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
  ) {
    super(locationModel);
  }
}
