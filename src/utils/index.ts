import { SeedProducts } from "@/interfaces";

export const fetchAllProducts = async () => {
  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=es&lang=es&currentpage=0&pagesize=30&categories=divided&concepts=H%26M%20MAN";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "18caef3f17mshe2fafce883ee253p1397a3jsnc174f7839170",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new Error("An error ocurred while feching the data");
      throw error;
    }
    const result = (await response.json()) as SeedProducts;
    const {
      results,
      baseUrl,
      facets,
      freeTextSearch,
      pagination,
      rangeFacets,
    } = result;

    return {
      results,
      baseUrl,
      facets,
      freeTextSearch,
      pagination,
      rangeFacets,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetchAllProducuts");
  }
};
