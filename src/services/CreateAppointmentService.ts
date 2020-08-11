import { startOfHour } from 'date-fns';
import Appoitment from '../models/Appointment';
import appoitmentsRepository from '../repositories/AppoitmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appoitmentsRepository: appoitmentsRepository;

  // eslint-disable-next-line no-shadow
  constructor(appoitmentsRepository: appoitmentsRepository) {
    this.appoitmentsRepository = appoitmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appoitment {
    const startDateHour = startOfHour(date);

    const findAppoitmentInSameDate = this.appoitmentsRepository.findBydate(
      startDateHour,
    );

    if (findAppoitmentInSameDate) {
      throw Error("it's not possible, this appoint is already booked");
    }

    const appointment = this.appoitmentsRepository.createAppoitment({
      provider,
      date: startDateHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
