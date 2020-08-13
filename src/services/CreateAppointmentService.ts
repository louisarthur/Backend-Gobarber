import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appoitment from '../models/Appointment';
import AppoitmentsRepository from '../repositories/AppoitmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appoitment> {
    const appoitmentsRepository = getCustomRepository(AppoitmentsRepository);
    const startDateHour = startOfHour(date);

    const findAppoitmentInSameDate = await appoitmentsRepository.findBydate(
      startDateHour,
    );

    if (findAppoitmentInSameDate) {
      throw Error("it's not possible, this appoint is already booked");
    }

    const appointment = appoitmentsRepository.create({
      provider,
      date: startDateHour,
    });
    
    await appoitmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
