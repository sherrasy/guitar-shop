export const LoggerInfoMessage = {
  Init: ' initialization...',
  InitDone:'initialization completed.',
  InitServerDone:'Server started on ',
  Config: '.env file found and successfully parsed.',
  DbConnect:'Database connection established.',
  DbConnectInProgress:'Trying to connect to MongoDB...',
  DbDisconnect:'Database connection closed.',
  NewData:'New data created: ',
  NewRoute:'Route registered: ',
  RegisterRoute:'Register routes for ',
  RegisterFilter:'Register ExceptionFilter:',
} as const;

export const LoggerErrorMessage = {
  DbConnectFail: 'Failed to connect to the database. Attempt ',
  DbConnectMultipleFail: 'Unable to establish database connection.',
} as const;
