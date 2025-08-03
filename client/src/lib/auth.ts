export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  const token = getStoredToken();
  const user = getStoredUser();
  return !!(token && user);
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
