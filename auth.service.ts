import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = [];

  // private readonly users = [
  //   {
  //     email: '',
  //     password: '',
  //     name: '',
  //   },
  // ];

  async signUp(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.users.push({ email, password: hashedPassword, name });
    return this.users;
  }

  async login(email: string, password: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return { message: 'Password not valid' };
    }

    return { message: 'Logged in' };
  }
}
