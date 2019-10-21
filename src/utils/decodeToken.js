import jwtDecode from 'jwt-decode';

const isEmpty = value =>
  !value ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

const decodeToken = token => {
  if (!isEmpty(token)) {
    const bearerHeaderToken = token.split(' ');
    const bearerToken = bearerHeaderToken[1];

    const { exp } = jwtDecode(bearerToken);

    return {
      tokenExpired: exp ? exp < Date.now() / 1000 : false,
    };
  }
  return {};
};

export { decodeToken, isEmpty };
