export const AppComponent = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),
  GuitarServiceInterface: Symbol.for('GuitarServiceInterface'),
  GuitarModel: Symbol.for('GuitarModel'),
  GuitarController: Symbol.for('GuitarController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
} as const;
