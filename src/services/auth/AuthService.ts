import api from "../api";

const AuthService = {
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
};

export default AuthService;
