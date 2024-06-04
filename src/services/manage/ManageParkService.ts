import { getBearerToken } from "@/lib/utils";
import api from "../api";

const ManageParkService = {
  getParks: async (itemsPerPage: number, page: number) => {
    const response = await api.get("/manage/parks", {
      headers: {
        Authorization: getBearerToken(),
      },
      params: {
        itemsPerPage,
        page,
      },
    });
    return response;
  },
};

export default ManageParkService;
