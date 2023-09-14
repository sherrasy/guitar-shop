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
  Login: '/login',
  Register: '/register',
  List: '/guitar-list',
  Error: '*',
} as const;

export const FormStatus = {
  Add: 'add',
  Edit: 'edit',
} as const;

