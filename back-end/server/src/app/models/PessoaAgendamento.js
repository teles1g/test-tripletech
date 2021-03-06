import { Sequelize, Model } from 'sequelize';

class PessoaAgendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        pessoaid: Sequelize.INTEGER,
        agendamentoid: Sequelize.INTEGER,
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
      }
    );

    PessoaAgendamento.removeAttribute('id');

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pessoa, { foreignKey: 'pessoaid', as: 'pessoa' });
    this.belongsTo(models.Agendamento, {
      foreignKey: 'agendamentoid',
      as: 'agendamento',
    });
  }
}

export default PessoaAgendamento;
