import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("places")
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
    location: string;
}
