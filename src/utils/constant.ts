export const HelpMessage = {
  Title: ' Программа для подготовки данных для REST API сервера.',
  Example: ' Пример: main.js --<command> [--arguments]  ',
  Commands: ` Команды:
  --help:                      # печатает этот текст
  --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных`
} as const;

export const UsernameLength = {
  Min:1,
  Max:15,
};

export const PasswordLength = {
  Min:6,
  Max:12,
};

export const GuitarNameLength = {
  Min:10,
  Max:100,
};

export const DescriptionLength = {
  Min:20,
  Max:1024,
};
export const VendorLength = {
  Min:5,
  Max:40,
};

export const PriceLimit = {
  Min:100,
  Max:1000000,
};

export const ErrorMessage = {
  Fetch: 'Can\'t fetch data from '
}as const;

export const InfoMessage = {
  Generate: 'File successfully generated: ',
}as const;

export const ChunkSize = {
  Read:16384,
  Write: 2 ** 16
};
