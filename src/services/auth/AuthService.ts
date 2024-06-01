import api from "../api";

const AuthService = {
  // Register

  checkEmail: async (email: string) => {
    const response = await api.post("/auth/check/email", { email });
    return response;
  },

  checkUsername: async (username: string) => {
    const response = await api.post("/auth/check/username", { username });
    return response;
  },

  register: async (data: any) => {
    const response = await api.post("/auth/register", data);
    return response;
  },

  // Login

  login: async (data: any) => {
    const response = await api.post("/auth/login", data);
    return response;
  },

  // Forgot password

  sendForgotPasswordOtpCode: async (email: string) => {
    const response = await api.post("/auth/forgot-password/send", { email });
    return response;
  },

  checkForgotPasswordOtpCode: async (code: string) => {
    const response = await api.post("/auth/forgot-password/check", { code });
    return response;
  },

  resetPassword: async (data: any) => {
    const response = await api.post("/auth/forgot-password/reset", data);
    return response;
  },
};

export default AuthService;
