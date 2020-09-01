import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}
class AuthenticationSessionUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({
    email,
    password,
  }: RequestDTO): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect emai/password combination.');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Incorrect emai/password combination.');
    }
    // aprendendobackend - Assinatura
    // d9349172f0fc0f59598c28b866582d47
    const token = sign({}, 'd9349172f0fc0f59598c28b866582d47', {
      subject: user.id,
      expiresIn: '1d',
    });
    delete user.password;
    return { user, token };
  }
}
export default AuthenticationSessionUserService;
