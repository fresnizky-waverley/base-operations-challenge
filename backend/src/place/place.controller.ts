import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @Get()
  findByRadius(
    @Query('longitude') longitude: number, 
    @Query('latitude') latitude: number, 
    @Query('radius') radius: number
  ) {
    return this.placeService.findByRadius(longitude, latitude, radius);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(+id, updatePlaceDto);
  }

}
