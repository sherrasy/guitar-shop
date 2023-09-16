import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../controller/controller.abstract.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import { HttpMethod } from '../../../types/http-method.enum.js';
import { LoggerInterface } from '../../../types/core/logger.interface';
import { UserServiceInterface } from './user-service.interface';
import CreateUserDto from './dto/create-user.dto.js';
import HttpError from '../../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { ConfigInterface } from '../../../types/core/config.interface.js';
import UserRdo from './rdo/user.rdo.js';
import { fillDTO } from '../../helpers/common.js';
import LoginUserDto from './dto/login-user.dto.js';
import { LoggerInfoMessage } from '../../logger/logger.constant.js';
import { ConfigSchema } from '../../../types/core/config-schema.type.js';
import { ControllerRoute } from '../../../utils/constant.js';
import { ValidateDTOMiddleware } from '../../middleware/validate-dto.middleware.js';

@injectable()
export default class UserController extends Controller {
  private readonly name = 'UserController';

  constructor(
    @inject(AppComponent.LoggerInterface)
    protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface)
    private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface)
    private readonly configService: ConfigInterface<ConfigSchema>
  ) {
    super(logger);

    this.logger.info(LoggerInfoMessage.RegisterRoute.concat(this.name));

    this.addRoute({
      path: ControllerRoute.Login,
      method: HttpMethod.Get,
      handler: this.check,
    });

    this.addRoute({
      path: ControllerRoute.Login,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares:[
        new ValidateDTOMiddleware(LoginUserDto),
      ]
    });

    this.addRoute({
      path: ControllerRoute.Register,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares:[
        new ValidateDTOMiddleware(CreateUserDto),
      ]
    });
  }

  public async create(
    {
      body,
    }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${body.email}" exists.`,
        this.name
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    {
      body,
    }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    _res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email "${body.email}" not found`,
        this.name
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      this.name
    );
  }

  public async check({ body }: Request, res: Response): Promise<void> {
    const user = await this.userService.findByEmail(body.email);
    this.ok(res, fillDTO(UserRdo, user));
  }
}
