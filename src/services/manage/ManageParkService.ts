import { getBearerToken } from "@/lib/utils";
import api from "../api";
import { Park } from "@/types/db";
import axios from "axios";

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

  updatePark: async (parkId: string, data: any) => {
    const response = await api.put(`/manage/parks/${parkId}`, data, {
      headers: {
        Authorization: getBearerToken(),
      },
    });
    return response;
  },

  createPark: async (data: any) => {
    const response = await api.post("/manage/parks", data, {
      headers: {
        Authorization: getBearerToken(),
      },
    });
    return response;
  },

  getCoordinatesFromAddress: async (query: string) => {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: { q: query, format: "json" },
      }
    );
    return response;
  },
};

export default ManageParkService;
