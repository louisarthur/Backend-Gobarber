import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class ChangeFieldProviderToProviderID1597356579014
  implements MigrationInterface {
  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        /* o is nullable aqui é pq o prestador de serviço pode sair da plataforma,
         * entretanto todos os logs que ele possuiu ficará -> cascade
         */
        isNullable: true,
      }),
    );
    // para criar o relacio
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        // SET NULL -> Quando deletar as relações irão setar null, mas irão se manter
        onDelete: 'SET NULL',
        // CASCADE -> Alterações refletem nos relacionamentos (caso o id mude)
        onUpdate: 'CASCADE',
      }),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
