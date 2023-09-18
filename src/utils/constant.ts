export const DEFAULT_USER = {
  name: 'admin',
  email: 'admin@test.ru',
  password: 'admin123'
};

export const VALID_MIMETYPES = ['jpeg','png'];

export const HelpMessage = {
  Title: ' Программа для подготовки данных для REST API сервера.',
  Example: ' Пример: main.js --<command> [--arguments]  ',
  Commands: ` Команды:
  --help:                      # печатает этот текст
  --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных`
} as const;

export const ErrorMessage = {
  Fetch: 'Can\'t fetch data from ',
  Import: 'Не удалось импортировать данные. Ошибка: ',
  Config: 'Can\'t read .env file. Perhaps the file does not exist.',
  DbConnect:'Already connected to database',
  DbConnectFail:'Failed to connect to the database.',
  DbDisconnect:'Not connected to the database',
  InvalidMimetype:'Wrong file mimetype',
  Unauthorized:'User unauthorized',
  InvalidToken:'Invalid token',
  Undefined:'User undefined',
  NoContent: 'No content'
}as const;

export const InfoMessage = {
  GenerateFile: 'File successfully generated: ',
  ImportData: 'Import completed. Rows amount: ',
}as const;

export const CommandName = {
  Help:'--help',
  Generate:'--generate'
};

export const ChunkSize = {
  Read:16384,
  Write: 2 ** 16
};

export const DbReconnectParam = {
  Count:5,
  Timeout: 10000
};

export const EntityName = {
  User:'User',
  Guitar:'Guitar',
} as const;

export const AppPartName = {
  App:'Application',
  Db:'Database',
  Server:'Server',
  Controller:'Controller',
  Middleware:'Global middleware',
  Filter:'ExceptionFilters',
} as const;

export const ControllerRoute = {
  Main:'/',
  GuitarsList:'/guitars',
  // GuitarsFullList:'/show-pages',
  Guitar:'/:guitarId',
  UsersList: '/users',
  User:'/:userId',
  Register:'/register',
  Login:'/login',
};

export const ObjectIdParam = {
  UserId:'userId',
  GuitarId:'guitarId',
} as const;

export const MiddlewareName = {
  DocumentExists:'DocumentExistsMiddleware',
  ValidateObjectId:'ValidateObjectIdMiddleware',
  Authenticate:'AuthenticateMiddleware',
  PrivateRoute:'PrivateRouteMiddleware'
} as const;

export const ExceptionFilterName = {
  Base:'BaseExceptionFilter',
  Validation:'ValidationExceptionFilter',
  Http:'HttpErrorExceptionFilter',
} as const;

export const DirectoryPath = {
  Upload:'/upload',
  Static:'/static',
} as const;

export const PhotoUploadParam = {
  ResourseField:'photo',
  DefaultImage:'catalog-product-0.png',
} as const;

