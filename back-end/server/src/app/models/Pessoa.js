import { Sequelize, Model } from 'sequelize';

class Pessoa extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.TEXT,
        datadenascimento: Sequelize.TEXT,
        email: Sequelize.TEXT,
        telefone: Sequelize.TEXT,
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
      }
    );

    return this;
  }
}

export default Pessoa;
