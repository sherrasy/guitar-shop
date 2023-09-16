import { UserEntity } from './user.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../../types/core/logger.interface.js';
import { LoggerInfoMessage } from '../../logger/logger.constant.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import { EntityName } from '../../../utils/constant.js';
import LoginUserDto from './dto/login-user.dto.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger:LoggerInterface,
    @inject(AppComponent.UserModel) private readonly userModel:types.ModelType<UserEntity>
  ){}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);

    this.logger.info(LoggerInfoMessage.NewData.concat(EntityName.User));

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      return existingUser;
    }

    return this.create(dto, salt);
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (! user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }

    return null;
  }
}
