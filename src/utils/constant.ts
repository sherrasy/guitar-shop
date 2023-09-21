export const PHOTO_RESOURSE_FIELD = 'photo';

export const DEFAULT_STATIC_IMAGES = ['catalog-product-0.png','catalog-product-1.png','catalog-product-2.png','catalog-product-3.png','catalog-product-4.png','catalog-product-5.png','catalog-product-6.png','catalog-product-7.png','catalog-product-8.png','catalog-product-9.png'];

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
} as const;

export const InfoMessage = {
  GenerateFile: 'File successfully generated: ',
  ImportData: 'Import completed. Rows amount: ',
} as const;

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

export const CollectionName = {
  User:'users',
  Guitar:'guitars',
} as const;

export const AppPartName = {
  Main:'Application',
  Db:'Database',
  Server:'Server',
  Controller:'Controller',
  Middleware:'Global middleware',
  Filter:'ExceptionFilters',
} as const;

export const ControllerRoute = {
  Main:'/',
  GuitarsList:'/guitars',
  GuitarsPagesAmount:'/show-pages',
  Guitar:'/:guitarId',
  UsersList: '/users',
  User:'/:userId',
  Register:'/register',
  Login:'/login',
};

export const ObjectIdParam = {
  User:'userId',
  Guitar:'guitarId',
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
