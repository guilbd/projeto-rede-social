import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async login(data: CreateAuthDto): Promise<AuthResponse> {
    const { username, password } = data;

    const user = await this.db.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('invalid_credentials');
    }

    return {
      token: this.jwt.sign({ username }),
      user,
    };
  }
}
