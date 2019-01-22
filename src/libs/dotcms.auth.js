export const isLogin = () => {
  return document.cookie.split('access_token').length > 1;
};

export const logout = () => {
  return fetch('v1/logout', {
    method: 'PUT'
  });
};

export const login = ({ user, password }) => {
  return fetch('/api/v1/authentication/api-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: user,
      password: password,
      expirationDays: 10
    })
  });
};
