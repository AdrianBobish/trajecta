export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  username: string;
  age: number;
  is_first_login: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export const API_BASE_URL = 'http://localhost:8000/api';

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('trajecta_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('trajecta_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('trajecta_token');
};

// User management
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('trajecta_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: User): void => {
  localStorage.setItem('trajecta_user', JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem('trajecta_user');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getToken() !== null && getUser() !== null;
};

// Logout function
export const logout = (): void => {
  removeToken();
  removeUser();
};

// API helper with authentication
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
};

// Login function
export const login = async (identifier: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const data: AuthResponse = await response.json();
  
  // Store user data and token
  setUser(data.user);
  setToken(data.token);
  
  return data;
};

// Register function
export const register = async (userData: {
  full_name: string;
  email: string;
  phone: string;
  username: string;
  age: number;
  password: string;
  confirmPassword: string;
}): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  const data: AuthResponse = await response.json();
  
  // Store user data and token
  setUser(data.user);
  setToken(data.token);
  
  return data;
};

// Chat function
export const sendChatMessage = async (message: string): Promise<{ message: string }> => {
  const response = await apiRequest('/chat/message', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send message');
  }

  return await response.json();
}; 