import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}
// Não precisa de repositório pq não tem nenhum método que não vem por padrão
// do typeORM
class CreateUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserEmailExist = await userRepository.findOne({
      where: { email },
    });

    if (checkUserEmailExist) {
      throw new Error('Email adress already used.');
    }
    const hashedPassword = await hash(password, 9);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    delete user.password;
    return user;
  }
}

export default CreateUserService;
