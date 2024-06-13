import api from "./api";

const SearchService = {
  searchParks: async (query: string) => {
    const response = await api.get("/search/parks", {
      params: { query },
    });
    return response;
  },
};

export default SearchService;
