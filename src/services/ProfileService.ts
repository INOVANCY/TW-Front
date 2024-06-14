import { getBearerToken } from "@/lib/utils";
import api from "./api";

const ProfileService = {
  getProfile: async () => {
    api.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    const response = await api.get("/profile/me");
    return response;
  },

  updateProfile: async (data: any) => {
    const response = await api.put("/profile/update", data);
    return response;
  },

  updateProfilePicture: async (data: any) => {
    const response = await api.put("/profile/picture", data, {
      headers: {
        Authorization: getBearerToken(),
      },
    });
    return response;
  },

  changePassword: async (data: any) => {
    const response = await api.put("/profile/change-password", data);
    return response;
  },

  getPublicProfile: async (username: string) => {
    const response = await api.get(`/profile/public/${username}`);
    return response;
  },
};

export default ProfileService;
