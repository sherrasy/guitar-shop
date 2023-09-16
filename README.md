# Guitar-shop

## Окружение

В терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

### Запустить JSON-server с моковыми данными

Запускает тестовый сервер на порту 3123. После выполнения команды данные доступны на http://localhost:3123/api.

```bash
npm run mock:server
```

### Запустить проект

#### Frontend

```bash
cd frontend
npm start
```

#### Backend

```bash
npm run start
npm run start:dev
```

### Запустить CLI

```bash
npm run ts cli
```

CLI поддерживает обработку аргументов:

`--help`

Выводит список и описание всех поддерживаемых аргументов.

> Является командой по умолчанию, если не передан аргумент при запуске CLI.

```bash
npm run cli -- --help
```

`--generate <n> <filepath> <url>`

Создаёт файл в формате tsv с тестовыми данными.

> Перед выполнением необходимо запустить сервер с моковыми данными.

```bash
npm run cli -- --generate 10 ./mocks/test-data.tsv http://localhost:3123/api
```

### Переменные окружения

#### Frontend

- `PORT=3000` - номер порта фронтенд;

#### Backend

- `PORT=4001` - номер порта бэкенд;

- `SALT=text` - случайный набор символов для хеширования пароля;

- `DB_USER=admin` - имя пользователя базы данных;

- `DB_PASSWORD=test` - пароль пользователя базы данных;

- `DB_HOST=127.0.0.1` - IP-адрес сервера базы данных;

- `DB_PORT=27017` - порт сервера базы данных;

- `DB_NAME='guitar-shop'` - название базы данных;

- `UPLOAD_DIRECTORY=upload` - название директории для загружаемых файлов;

- `JWT_SECRET=secret` - строка, которая будет использоваться в процессе шифрования.

### Количество часов, затраченных на проект
