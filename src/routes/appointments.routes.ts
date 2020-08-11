import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
// parseISO transforma o timestamp e transforma em hora nativa do javascript
// import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppoitmentsRepository';
// Responsabilidade da rota é receber a requisição, chamar outro arquivo e devolver uma resposta
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const allAppointments = appointmentRepository.getAllAppointments();
  return response.json(allAppointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
