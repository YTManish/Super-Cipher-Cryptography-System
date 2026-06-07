export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Function to handle user login
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

// Function to check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getToken();
}

// Function to get the authentication token from cookies
export function getToken(): string | null {
  if (typeof document !== 'undefined') {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1] || null;
  }
  return null;
}

// Function to set the authentication token in cookies
export function setToken(token: string): void {
  if (typeof document !== 'undefined') {
    document.cookie = `auth_token=${token}; path=/; max-age=86400; secure; samesite=strict`;
  }
}

// Function to remove the authentication token from cookies (logout)
export function removeToken(): void {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

// Function to get the current user from token
export function getCurrentUser(): User | null {
  const token = getToken();
  if (!token) return null;

  try {
    // This is a simple JWT decode. In a real app, you might want to use a proper JWT library
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.user;
  } catch (error) {
    removeToken();
    return null;
  }
}