import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}
  create(createPlaceDto: CreatePlaceDto) {
    return this.placeRepository.query(
      `INSERT INTO places (name, address, location) 
        VALUES (
          '${createPlaceDto.name}', 
          '${createPlaceDto.address}', 
          ST_GeomFromText('POINT(${createPlaceDto.longitude} ${createPlaceDto.latitude})', 4326)
        )`,
    );
  }

  findByRadius(longitude: number, latitude: number, radius: number) {
    return this.placeRepository.query(
      `SELECT id, name, address, ST_X(location) as longitude, ST_Y(location) as latitude, ST_DistanceSphere(location, ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)) as distance 
        FROM places 
        WHERE distance <= ${radius} ORDER BY distance ASC`,
    )
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return this.placeRepository.query(
      `UPDATE places SET 
        name = '${updatePlaceDto.name}', 
        address = '${updatePlaceDto.address}', 
        location = ST_GeomFromText('POINT(${updatePlaceDto.longitude} ${updatePlaceDto.latitude})', 4326) 
        WHERE id = ${id}`,
    )
  }
}
