import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// Data Transfer Object
interface CreateAppoitmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public getAllAppointments(): Appointment[] {
    return this.appointments;
  }

  /**
   * create
   */
  // Indicar o tipo d retorno.
  public createAppoitment({
    provider,
    date,
  }: CreateAppoitmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);

    return appointment;
  }

  public findBydate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appoint =>
      isEqual(date, appoint.date),
    );
    return findAppointment || null;
    // lembrar desse ternário
  }
}
export default AppointmentsRepository;
