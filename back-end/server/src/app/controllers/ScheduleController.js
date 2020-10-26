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

    const schedule = await PessoaAgendamento.findAll({
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

    if (schedule.length > 0) {
      return res
        .status(400)
        .json({ error: 'You cannot save these schedules.' });
    }

    const first = await Agendamento.create({
      pessoa: pessoa1,
      datainicio: startDate,
      datafim: endDate,
      local: faker.address.city(),
    });

    const second = await Agendamento.create({
      pessoa: pessoa2,
      datainicio: startDate,
      datafim: endDate,
      local: faker.address.city(),
    });

    const third = await Agendamento.create({
      pessoa: pessoa3,
      datainicio: startDate,
      datafim: endDate,
      local: faker.address.city(),
    });

    const promise = Promise.all([first, second, third]);

    return promise
      .catch(error => {
        return res.status(400).json(error);
      })
      .then(data => {
        return res.status(200).json(data);
      });
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
