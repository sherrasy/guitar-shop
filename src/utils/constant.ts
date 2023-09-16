export const DEFAULT_USER = {
  name: 'admin',
  email: 'admin@test.ru',
  password: 'admin'
};

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
  Config: 'Can\'t read .env file. Perhaps the file does not exist.'
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
