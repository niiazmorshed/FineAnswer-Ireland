// Single source of truth for the auth token.
// "Remember me" decides persistence:
//   remember = true  -> localStorage   (survives browser close)
//   remember = false -> sessionStorage (cleared when browser/tab closes)
const TOKEN_KEY = "token";

export const getToken = () =>
  sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);

export const setToken = (token, remember = true) => {
  // Clear both first so only the chosen store holds the token.
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};
