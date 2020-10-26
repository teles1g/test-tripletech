import { Sequelize, Model } from 'sequelize';

import PessoaAgendamento from './PessoaAgendamento';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        pessoa: {
          type: Sequelize.VIRTUAL,
          allowNull: false,
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

    this.addHook('afterSave', async agendamento => {
      const agendamentoid = await Agendamento.max('id');

      await PessoaAgendamento.create({
        pessoaid: agendamento.pessoa,
        agendamentoid,
      });
    });

    return this;
  }
}

export default Agendamento;
