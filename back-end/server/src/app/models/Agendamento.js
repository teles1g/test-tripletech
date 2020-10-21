import { Sequelize, Model } from 'sequelize';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        local: Sequelize.TEXT,
        datainicio: Sequelize.TEXT,
        datafim: Sequelize.TEXT,
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
      }
    );

    this.addHook('beforeSave', async agendamento => {
      agendamento.id = (await Agendamento.max('id')) + 1;
    });

    return this;
  }
}

export default Agendamento;
