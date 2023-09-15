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

export const ChunkSize = {
  Read:16384,
  Write: 2 ** 16
};

export const DbReconnectParam = {
  Count:5,
  Timeout: 10000
};

export const LoggerInfoMessage = {
  InitApp: 'Application initialization...',
  LoggerCreation:'Logger created...',
  Config: '.env file found and successfully parsed.',
  DbConnect:'Database connection established.',
  DbConnectInProgress:'Trying to connect to MongoDB...',
  DbDisconnect:'Database connection closed.',
  InitDb:'Init database...',
  InitDbDone:'Init database completed',
  NewData:'New data created: ',
}as const;

export const LoggerErrorMessage = {
  DbConnectFail: 'Failed to connect to the database. Attempt ',
  DbConnectMultipleFail: 'Unable to establish database connection.',
}as const;

export const AppComponent = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  GuitarServiceInterface: Symbol.for('GuitarServiceInterface'),
  GuitarModel: Symbol.for('GuitarModel'),
} as const;

export const EntityName = {
  User:'User',
  Guitar:'Guitar',
} as const;
