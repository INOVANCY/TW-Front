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

  // Lands

  fetchLands: async (parkId: string) => {
    const response = await api.get(`/manage/parks/${parkId}/lands`, {
      headers: {
        Authorization: getBearerToken(),
      },
    });
    return response;
  },

  createLand: async (parkId: string, data: any) => {
    const response = await api.post(`/manage/parks/${parkId}/lands`, data, {
      headers: {
        Authorization: getBearerToken(),
      },
    });
    return response;
  },

  updateLand: async (parkId: string, landId: string, data: any) => {
    const response = await api.put(
      `/manage/parks/${parkId}/lands/${landId}`,
      data,
      {
        headers: {
          Authorization: getBearerToken(),
        },
      }
    );
    return response;
  },

  // Rates

  fetchRates: async (parkId: string) => {
    const response = await api.get(`/manage/parks/${parkId}/rates`, {
      headers: {
        Authorization: getBearerToken(),
      },
    });
    return response;
  },

  createRate: async (parkId: string, data: any) => {
    const response = await api.post(`/manage/parks/${parkId}/rates`, data, {
      headers: {
        Authorization: getBearerToken(),
      },
    });
    return response;
  },

  updateRate: async (parkId: string, rateId: string, data: any) => {
    const response = await api.put(
      `/manage/parks/${parkId}/rates/${rateId}`,
      data,
      {
        headers: {
          Authorization: getBearerToken(),
        },
      }
    );
    return response;
  },
};

export default ManageParkService;
