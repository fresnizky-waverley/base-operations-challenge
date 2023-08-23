import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePlacesTable1692795363406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE places (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address TEXT NOT NULL,
                location GEOMETRY(POINT, 4326) NOT NULL
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE places;`)
    }

}
