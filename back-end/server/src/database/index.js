import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Agendamento from '../app/models/Agendamento';
import Pessoa from '../app/models/Pessoa';
import PessoaAgendamento from '../app/models/PessoaAgendamento';

const models = [Agendamento, Pessoa, PessoaAgendamento];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
