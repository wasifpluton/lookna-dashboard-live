// Login
export interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
}
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    username: string;
    email: string;
    role: string[];
    _id: string;
  };
}
