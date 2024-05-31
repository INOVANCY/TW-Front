import api from "../api";

const AuthService = {
  checkEmail: async (email: string) => {
    const response = await api.post("/auth/check/email", { email });
    return response;
  },
};

export default AuthService;
