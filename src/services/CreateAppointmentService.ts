import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppoitmentsRepository from '../repositories/AppoitmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appoitmentsRepository = getCustomRepository(AppoitmentsRepository);
    const startDateHour = startOfHour(date);

    const findAppoitmentInSameDate = await appoitmentsRepository.findBydate(
      startDateHour,
    );

    if (findAppoitmentInSameDate) {
      throw Error("it's not possible, this appoint is already booked");
    }

    const appointment = appoitmentsRepository.create({
      provider_id,
      date: startDateHour,
    });

    await appoitmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
