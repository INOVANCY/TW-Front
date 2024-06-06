import { getBearerToken } from "@/lib/utils";
import api from "../api";

const ManageParkService = {
  getParks: async (pageIndex: number, pageSize: number, query: string) => {
    const response = await api.get("/manage/parks", {
      headers: {
        Authorization: getBearerToken(),
      },
      params: { pageIndex, pageSize, query },
    });
    return response;
  },
};

export default ManageParkService;
