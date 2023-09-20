export const DEFAULT_PAGE_SERVER = 0;

export const STRINGS_AMOUNTS = [4, 6, 7, 12];

export const VALID_MIMETYPES = ['jpeg','png'];

export const PRICE_FORMAT_PATTERN = /\B(?=(\d{3})+(?!\d))/g;

export const DATE_LOCALE = 'ru-RU';

export const PriceLimit = {
  Min:100,
  Max:1000000,
};

export const PaginationParam = {
  DefaultPage: 1,
  NextPage: 2,
  DefaultAmount: 3,
};

export const FormFieldName = {
  Type: 'item-type',
  StringsAmount:'string-qty',
  Date:'date',
  Title : 'title',
  Photo : 'photo',
  Price:'price',
  Vendor:'squ',
  Description : 'description'
} as const;

export const GuitarFilterLabel = {
  Electric: 'Электрогитара',
  Acoustic: 'Акустическая гитара',
  Ukulele: 'Укулеле'
} as const;

export const AppRoute = {
  Login: '/',
  Register: '/register',
  List: '/guitar-list',
  Error: '*',
} as const;

export const QueryPathName = {
  Page: 'page=',
  SortBy: 'sortBy=',
  SortDirection: 'sortDirection=',
  Type: 'type=',
  StringsAmount: 'stringsAmount=',
} as const;

export const FormStatus = {
  Add: 'add',
  Edit: 'edit',
} as const;

export const GuitarTab = {
  Details: 'details',
  Description: 'description',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const ApiConnectParam = {
  Url:'http://localhost:4000',
  Timeout: 5000
};

export const ReducerName = {
  Guitars: 'GUITARS',
  Guitar: 'GUITAR',
  User: 'USER'
} as const;

export const ApiErrosMessage = {
  Unauthorized: 'You\'re not logged in. Some features are not available',
  FetchPagesError:'Can`t get pages data'
} as const;

export const ActionName = {
  CheckAuth: 'checkAuth',
  Login: 'login',
  Register: 'register',
  FetchGuitars: 'fetchGuitars',
  FetchPagesAmount: 'fetchPagesAmount',
  FetchGuitar: 'fetchGuitarById',
  DeleteGuitar: 'deleteGuitar',
  CreateGuitar: 'createGuitar',
  EditGuitar: 'editGuitar',
} as const;

export const ApiRoute = {
  Login: '/users/login',
  Register: '/users/register',
  GuitarList: '/guitars',
  PagesAmount: '/guitars/show-pages',
  Photo: 'photo',
} as const;

export const ValidationPattern = {
  Email: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
  Password: /([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])/,
} as const;
