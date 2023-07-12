import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      if (
        !req.headers.authorization.startsWith('Bearer ') ||
        !req.headers.authorization
      ) {
        throw new UnauthorizedException({ message: 'Авторизация не прошла' });
      }
      const token = req.headers.authorization.replace('Bearer ', '');
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Авторизация не прошла' });
    }
  }
}
