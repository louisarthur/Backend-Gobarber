import { uuid } from 'uuidv4';
import { Entity } from 'typeorm';

@Entity('appointments')
class Appointment {
  id: string;

  provider: string;

  date: Date;

  // O Omit é uma "função", recebe dois parametros, o tipo, e a variavel que eu quero omitir
  // Não utilizei uma interface para esse construtor.
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
