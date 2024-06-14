import api from "./api";

const ParkService = {
  getPark: async (id: string) => {
    const response = await api.get(`/parks/${id}`);
    return response;
  },
};

export default ParkService;
