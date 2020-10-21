import { Op } from 'sequelize';
import * as Yup from 'yup';
import faker from 'faker';

import Pessoa from '../models/Pessoa';
import Agendamento from '../models/Agendamento';
import PessoaAgendamento from '../models/PessoaAgendamento';

class SchedulingController {
  async index(req, res) {
    const { date } = req.query;

    const schedule = await PessoaAgendamento.findAll({
      include: [
        {
          model: Pessoa,
          as: 'pessoa',
        },
        {
          model: Agendamento,
          as: 'agendamento',
          where: {
            datainicio: {
              [Op.like]: `${date}%`,
            },
          },
        },
      ],
    });

    return res.json(schedule);
  }

  async store(req, res) {
    const { pessoa1, pessoa2, pessoa3, datainicio, datafim } = req.body;

    const schema = Yup.object().shape({
      pessoa1: Yup.number().required(),
      pessoa2: Yup.number().required(),
      pessoa3: Yup.number().required(),
      datainicio: Yup.date().required(),
      datafim: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const startDate = datainicio.replace(' ', 'T');
    const endDate = datafim.replace(' ', 'T');

    const scheduleExists = await PessoaAgendamento.findAll({
      where: {
        pessoaid: {
          [Op.or]: [pessoa1, pessoa2, pessoa3],
        },
      },
      include: [
        {
          model: Agendamento,
          as: 'agendamento',
          where: {
            datainicio: startDate,
            datafim: endDate,
          },
        },
      ],
    });

    if (scheduleExists.length > 0) {
      return res
        .status(400)
        .json({ error: 'You cannot saving this schedule.' });
    }

    const schedule1 = await Agendamento.create({
      datainicio: startDate,
      datafim: endDate,
      local: faker.address.city(),
    });

    const schedule2 = await Agendamento.create({
      datainicio: startDate,
      datafim: endDate,
      local: faker.address.city(),
    });

    const schedule3 = await Agendamento.create({
      datainicio: startDate,
      datafim: endDate,
      local: faker.address.city(),
    });

    const person1 = await PessoaAgendamento.create({
      pessoaid: pessoa1,
      agendamentoid: schedule1.id,
    });

    const person2 = await PessoaAgendamento.create({
      pessoaid: pessoa2,
      agendamentoid: schedule2.id,
    });

    const person3 = await PessoaAgendamento.create({
      pessoaid: pessoa3,
      agendamentoid: schedule3.id,
    });

    const promise = Promise.all([
      schedule1,
      schedule2,
      schedule3,
      person1,
      person2,
      person3,
    ]);

    promise
      .catch(error => {
        return res
          .json(error.status)
          .json({ error: 'Error saving schedules.' });
      })
      .finally(() => {
        return res.json({ error: 'Schedules done successfully.' });
      });

    return promise;
  }

  async update(req, res) {
    const { id, datainicio, datafim } = req.body;

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      datainicio: Yup.date().required(),
      datafim: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const schedule = await Agendamento.findByPk(id);

    if (!schedule) {
      return res.status(400).json({ error: 'This schedule does not exists.' });
    }

    const startDate = datainicio.replace(' ', 'T');
    const endDate = datafim.replace(' ', 'T');

    const scheduleExists = await Agendamento.findAndCountAll({
      where: {
        datainicio: startDate,
        datafim: endDate,
      },
    });

    if (scheduleExists.count > 0) {
      return res.status(400).json({
        error: 'You cannot update this schedule.',
      });
    }

    try {
      await schedule.update({
        datainicio: startDate,
        datafim: endDate,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Error updating schedules.' });
    }

    return res.json(schedule);
  }
}

export default new SchedulingController();
