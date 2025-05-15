import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'valid-jwt-token' }),
            validateUser: jest.fn().mockResolvedValue({ email: 'user@example.com' }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('retornar token JWT válido depois do sucesso no login', async () => {
    const result = await authController.login({ email: 'user@example.com', password: 'password' });
    expect(result).toEqual({ access_token: 'valid-jwt-token' });
  });

  it('enviar erro de não autorizado se credenciais inválidas', async () => {
    jest.spyOn(authService, 'validateUser').mockRejectedValue(new Error('Invalid credentials'));

    await expect(authController.login({ email: 'user@example.com', password: 'wrongpassword' })).rejects.toThrow('Invalid credentials');
  });
});
