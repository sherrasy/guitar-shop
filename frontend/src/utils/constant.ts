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

export const StringsAmounts = [4,6,7,12];

export const ImageTypes = ['jpeg','png'];

export const AppRoute = {
  Login: '/',
  Register: '/register',
  List: '/guitar-list',
  Error: '*',
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
  Unknown = 'UNKNOWN',
}

export const ApiConnectParam = {
  Url:'http://localhost:4000',
  Timeout: 5000
};

export const ReducerName = {
  Guitars: 'GUITARS',
  Guitar: 'GUITAR',
  User: 'USER',
} as const;

export const ActionName = {
  CheckAuth: 'checkAuth',
  Login: 'login',
} as const;

export const ApiRoute = {
  Login: '/users/login',
  Register: '/users/register',
} as const;

export const ApiError = {
  Guitar: 'Failed to load guitar data',
  Login: 'Failed to login',
  Unauthorized: 'You\'re not logged in. Some features are not available'
} as const;
