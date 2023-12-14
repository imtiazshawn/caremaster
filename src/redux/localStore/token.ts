export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token ?? "";
};

export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};
