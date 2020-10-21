import { Router } from 'express';

import ScheduleController from './app/controllers/ScheduleController';

const routes = new Router();

routes.post('/schedules', ScheduleController.store);
routes.put('/schedules', ScheduleController.update);
routes.get('/schedules', ScheduleController.index);

export default routes;
