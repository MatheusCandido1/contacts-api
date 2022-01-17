import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContactsTable1642038277143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'contacts',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'phone',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'category_id',
          type: 'varchar',
          isNullable: true,
        },
      ],
      foreignKeys: [
        {
          name: 'CategoryContact',
          columnNames: ['category_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'categories',
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts');
  }
}
