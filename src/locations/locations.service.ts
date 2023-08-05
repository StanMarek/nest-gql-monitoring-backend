import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { BaseService } from 'src/common/base.service';
import { CreateLocationInput } from './dto/create-location.input';
import { ReportDateFilterInput } from './dto/report-date-filter.input';
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

  async updateAfterReceivedMessage(
    filter: FilterQuery<LocationDocument>,
    update: UpdateQuery<LocationDocument>,
  ) {
    return this.locationModel.findOneAndUpdate(filter, update, { new: true });
  }

  async findAllFilterReports(
    filter: FilterQuery<LocationDocument> = {},
    reportFilter: ReportDateFilterInput,
  ) {
    const locations = await this.locationModel.find(filter);
    const startDate = new Date(reportFilter.from);
    const endDate = new Date(reportFilter.to);
    for (const location of locations) {
      const reports = location.reports;
      location.reports = reports.filter(
        (report) => report.date >= startDate && report.date <= endDate,
      );
    }
    return locations;
  }
}
