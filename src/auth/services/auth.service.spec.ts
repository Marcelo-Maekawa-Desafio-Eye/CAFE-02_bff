import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('valid-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('gerar token JWT válido', async () => {
    const result = await authService.login({ email: 'user@example.com' });
    expect(result.access_token).toEqual('valid-jwt-token');
  });

  it('enviar exceção para credenciais inválidas', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

    await expect(authService.validateUser('user@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
  });

  it('validar usuário sobre as credenciais corretas', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

    const user = await authService.validateUser('user@example.com', 'password');
    expect(user).toEqual({ email: 'user@example.com' });
  });
});
