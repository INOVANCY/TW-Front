import api from "./api";

const ProfileService = {
  getProfile: async () => {
    api.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    const response = await api.get("/profile/me");
    return response;
  },

  updateProfile: async (data: any) => {
    const response = await api.put("/profile", data);
    return response;
  },

  changePassword: async (data: any) => {
    const response = await api.put("/profile/change-password", data);
    return response;
  },
};

export default ProfileService;
