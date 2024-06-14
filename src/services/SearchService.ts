import api from "./api";

const SearchService = {
  mainSearch: async (query: string) => {
    const response = await api.get("/search", {
      params: { query },
    });
    return response;
  },

  searchParks: async (query: string) => {
    const response = await api.get("/search/parks", {
      params: { query },
    });
    return response;
  },
};

export default SearchService;
