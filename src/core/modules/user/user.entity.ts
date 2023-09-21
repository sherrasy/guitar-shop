import { User } from '../../../types/user.type';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/common.js';
import { CollectionName } from '../../../utils/constant.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: CollectionName.User
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User{
  @prop({required:true, default:''})
  public name:string;

  @prop({required:true, unique:true})
  public email:string;

  @prop({required: true, default: ''})
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.name = userData.name;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }

}
export const UserModel = getModelForClass(UserEntity);
